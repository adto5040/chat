import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatroomComponent } from './chatroom.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { RouterModule, Routes } from '@angular/router';

const config: SocketIoConfig = { url: 'http://localhost:8988', options: {} };

const routes: Routes = [{ path: '', component: ChatroomComponent }];

@NgModule({
  declarations: [ChatroomComponent],
  imports: [
    CommonModule,
    SocketIoModule.forRoot(config),
    RouterModule.forChild(routes)
  ]
})
export class ChatroomModule {}
