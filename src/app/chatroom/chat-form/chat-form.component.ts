import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {
  name = new FormControl('', Validators.required);

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {}

  sendMessage() {
    const msg = this.name.value.trim();
    if (msg) {
      this.chatService.sendMessage(msg);
      this.name.reset();
    }
  }
}
