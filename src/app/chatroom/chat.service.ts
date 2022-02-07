import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map, scan } from 'rxjs/operators';
import { Message } from './message.module';
import { LocalStorageService } from '../../shared/local-storage.service';
import { Guid } from 'guid-typescript';
import { merge } from 'rxjs';

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
        guid: Guid.raw(),
        text: text,
        writtenAt: new Date(),
        writtenBy: user
      };
      this.socket.emit(ChatClientEvent.PublishSingleMessage, message);
    }
  }

  loadHistoryMessages() {
    this.socket.emit(ChatClientEvent.LoadAllMessages);
  }
}
