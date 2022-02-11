import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ChatService } from '../services/chat.service';
import { fromEvent, merge, Subscription, timer } from 'rxjs';
import {
  exhaustMap,
  filter,
  mapTo,
  scan,
  withLatestFrom
} from 'rxjs/operators';
import { Message } from '../message.module';
import { transformToEmojis } from '../../../shared/transformToEmojis';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit, OnDestroy {
  @ViewChild('inputField', { static: true }) inputField?: ElementRef;
  @ViewChild('button', { static: true }) button?: ElementRef;
  @ViewChild('searchField', { static: true }) searchField?: ElementRef;

  input = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)
  ]);
  search = new FormControl('');

  caseSensitive = false;
  messagesExist = false;
  private sub = new Subscription();

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    const button$ = fromEvent<void>(this.button?.nativeElement, 'click');

    const inputField$ = fromEvent<KeyboardEvent>(
      this.inputField?.nativeElement,
      'keydown'
    ).pipe(filter((key: KeyboardEvent) => key.key === 'Enter'));

    const sendMessage$ = merge(button$, inputField$).pipe(
      filter(() => this.input.valid),
      mapTo('send')
    );

    const resetCounter$ = sendMessage$.pipe(
      exhaustMap(() => timer(5000)),
      mapTo('reset')
    );

    const counter$ = merge(sendMessage$, resetCounter$).pipe(
      scan((acc, value) => {
        return value === 'send' ? acc + 1 : 0;
      }, 0)
    );

    this.sub.add(
      sendMessage$
        .pipe(
          withLatestFrom(counter$),
          filter(([, x]) => x <= 3)
        )
        .subscribe(() => {
          this.sendMessage();
        })
    );

    this.sub.add(
      this.chatService.getMessages$.subscribe((messages: Message[]) => {
        this.messagesExist = messages.length > 0;
      })
    );
  }

  sendMessage() {
    if (!this.input.valid) {
      return;
    }

    this.chatService.sendMessage(this.input.value.trim());
    this.input.reset();
  }

  setSearchString() {
    this.chatService.setSearchString(this.search.value);
  }

  resetMessages() {
    this.chatService.clearMessages();
  }

  onKeyPressEvent(event: KeyboardEvent, target: string) {
    if (event.key === 'Enter') return;

    if (target === 'input') {
      this.input.setValue(transformToEmojis(this.input.value));
    } else if (target === 'search') {
      this.setSearchString();
      this.search.setValue(transformToEmojis(this.search.value));
    }
  }

  triggerCase() {
    this.caseSensitive = !this.caseSensitive;
    this.chatService.setCase(this.caseSensitive);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
