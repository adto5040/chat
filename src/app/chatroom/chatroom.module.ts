import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatroomComponent } from './chatroom.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { RouterModule, Routes } from '@angular/router';
import { ChatFormComponent } from './chat-form/chat-form.component';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserHighlightPipe } from './pipes/user-highlight.pipe';
import { DateFormatterPipe } from './pipes/date-formatter.pipe';
import { BadWordsFilterPipe } from './pipes/bad-words-filter.pipe';
import { ChatService } from './services/chat.service';

const config: SocketIoConfig = { url: 'ws://localhost:3000', options: {} };

const routes: Routes = [{ path: '', component: ChatroomComponent }];

@NgModule({
  declarations: [
    ChatroomComponent,
    ChatFormComponent,
    ChatMessagesComponent,
    DateFormatterPipe,
    UserHighlightPipe,
    BadWordsFilterPipe
  ],
  imports: [
    CommonModule,
    SocketIoModule.forRoot(config),
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  providers: [ChatService]
})
export class ChatroomModule {}
