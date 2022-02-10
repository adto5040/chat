import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { distinctUntilChanged, map, scan } from 'rxjs/operators';
import { Message } from '../message.module';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { Guid } from 'guid-typescript';
import { BehaviorSubject, merge } from 'rxjs';
import { BadWordsFilterPipe } from '../pipes/bad-words-filter.pipe';
import { UserHighlightPipe } from '../pipes/user-highlight.pipe';

enum ChatClientEvent {
  LoadAllMessages = '[Chat:Client] Load messages from history',
  RemoveAllMessages = '[Chat:Client] Remove messages from history',
  PublishSingleMessage = '[Chat:Client] Publish message to the channel',
  ResponseAllMessagesLoaded = '[Chat] All past messages have been loaded',
  ResponseMessagePublished = '[Chat] A new message has been published'
}

@Injectable()
export class ChatService {
  constructor(
    private socket: Socket,
    private localStorageService: LocalStorageService
  ) {}

  private _searchString$$ = new BehaviorSubject<string>('');
  private _caseSensitivity$$ = new BehaviorSubject<boolean>(false);

  getSearchString$ = this._searchString$$.pipe(distinctUntilChanged());
  getCaseSensitivity$ = this._caseSensitivity$$.asObservable();

  getHistoryMessages$ = this.socket.fromEvent<Message[]>(
    ChatClientEvent.ResponseAllMessagesLoaded
  );

  getNewMessages$ = this.socket
    .fromEvent<Message>(ChatClientEvent.ResponseMessagePublished)
    .pipe(
      map((message: Message) => {
        return [message];
      })
    );

  getMessages$ = merge<Message[]>(
    this.getHistoryMessages$,
    this.getNewMessages$
  ).pipe(
    scan(
      (oldMessages: Message[], newMessages: Message[]) => [
        ...oldMessages,
        ...newMessages
      ],
      []
    )
  );

  sendMessage(text: string) {
    const user = this.localStorageService.getUser();
    if (user) {
      const message: Message = {
        text: text,
        writtenAt: new Date(),
        writtenBy: user,
        guid: Guid.raw()
      };
      this.socket.emit(ChatClientEvent.PublishSingleMessage, message);
      this.botAnalyseMessage(message);
    }
  }

  botAnalyseMessage(message: Message) {
    const badWordsFilter = new BadWordsFilterPipe();
    let filteredMessage = badWordsFilter.transform(message.text);
    if (message.text !== filteredMessage) {
      this.socket.emit(ChatClientEvent.PublishSingleMessage, {
        text: `@${message.writtenBy} please tame your tongue!`,
        writtenAt: new Date(),
        writtenBy: 'Chatbot',
        guid: Guid.raw()
      });
    }

    const userHighlight = new UserHighlightPipe();
    filteredMessage = userHighlight.transform(message.text);
    if (message.text !== filteredMessage) {
      this.socket.emit(ChatClientEvent.PublishSingleMessage, {
        text: `A chat partner has been mentioned!`,
        writtenAt: new Date(),
        writtenBy: 'Chatbot',
        guid: Guid.raw()
      });
    }
  }

  setSearchString(text: string) {
    this._searchString$$.next(text);
  }

  setCase(caseSensitive: boolean) {
    this._caseSensitivity$$.next(caseSensitive);
  }

  loadHistoryMessages() {
    this.socket.emit(ChatClientEvent.LoadAllMessages);
  }

  clearMessages() {
    this.socket.emit(ChatClientEvent.RemoveAllMessages);
  }
}
