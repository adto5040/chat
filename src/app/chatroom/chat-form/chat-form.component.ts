import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ChatService } from '../chat.service';
import { fromEvent, merge, Subscription, timer } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit, OnDestroy {
  @ViewChild('inputField', { static: true }) inputField?: ElementRef;
  @ViewChild('button', { static: true }) button?: ElementRef;
  name = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)
  ]);
  private sub = new Subscription();
  private counter = 1;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    const button$ = fromEvent<void>(this.button?.nativeElement, 'click');

    const inputField$ = fromEvent<KeyboardEvent>(
      this.inputField?.nativeElement,
      'keydown'
    ).pipe(filter((key: KeyboardEvent) => key.key === 'Enter'));

    this.sub = merge(button$, inputField$)
      .pipe(
        // scan(count => count + 1, 0),
        filter(() => this.name.valid),
        map(() => this.counter++),
        filter(x => x <= 3),
        tap(() => this.sendMessage()),
        switchMap(() => timer(5000))
      )
      .subscribe(() => {
        console.log('Timer finished!');
        this.counter = 1;
      });
  }

  sendMessage() {
    if (!this.name.valid) {
      return;
    }

    this.chatService.sendMessage(this.name.value.trim());
    this.name.reset();
  }

  resetMessages() {
    this.chatService.clearMessages();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
