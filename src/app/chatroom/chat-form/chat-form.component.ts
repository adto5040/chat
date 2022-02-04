import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {
  name = new FormControl('', Validators.required);

  constructor() {}

  ngOnInit(): void {}

  sendMessage() {
    const msg = this.name.value.trim();
    if (msg) {
      console.log(msg);
      this.name.reset();
    }
  }
}
