import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ChatService } from '../chat.service';
import { fromEvent, merge, Subscription } from 'rxjs';
import { filter, repeat, take } from 'rxjs/operators';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit, OnDestroy {
  @ViewChild('inputField', { static: true }) inputField?: ElementRef;
  @ViewChild('button', { static: true }) button?: ElementRef;
  name = new FormControl('', Validators.required);
  private sub = new Subscription();

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    const button$ = fromEvent<void>(this.button?.nativeElement, 'click');
    const inputField$ = fromEvent<KeyboardEvent>(
      this.inputField?.nativeElement,
      'keydown'
    ).pipe(filter((key: KeyboardEvent) => key.key === 'Enter'));

    // TODO: If three messages have been sent withinfive seconds, the transmission of further messages within this time window should be blocked.
    this.sub = merge(button$, inputField$)
      .pipe(take(3), repeat())
      .subscribe(() => this.sendMessage());
  }

  sendMessage() {
    if (!this.name.value) {
      return;
    }

    const msg = this.name.value.trim();
    if (msg) {
      this.chatService.sendMessage(msg);
      this.name.reset();
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
