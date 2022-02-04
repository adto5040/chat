import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatroomComponent } from './chatroom.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { RouterModule, Routes } from '@angular/router';
import { ChatFormComponent } from './chat-form/chat-form.component';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';
import { ReactiveFormsModule } from '@angular/forms';

const config: SocketIoConfig = { url: 'http://localhost:8988', options: {} };

const routes: Routes = [{ path: '', component: ChatroomComponent }];

@NgModule({
  declarations: [ChatroomComponent, ChatFormComponent, ChatMessagesComponent],
  imports: [
    CommonModule,
    SocketIoModule.forRoot(config),
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class ChatroomModule {}
