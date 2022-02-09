import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit, OnDestroy {
  private sub = new Subscription();
  searchString = '';
  caseSensitivity = false;

  constructor(public chatService: ChatService) {}

  ngOnInit() {
    this.chatService.loadHistoryMessages();
    this.sub.add(
      this.chatService.getSearchString$.subscribe(
        searchString => (this.searchString = searchString)
      )
    );
    this.sub.add(
      this.chatService.getCaseSensitivity$.subscribe(
        caseSensitivity => (this.caseSensitivity = caseSensitivity)
      )
    );

    // Refresh all 30s
    this.sub.add(timer(30000, 30000).subscribe(() => {}));
  }

  distinctHighlight(text: string) {
    let highlight = false;
    let searchText = text;
    let searchString = this.searchString;
    if (!this.caseSensitivity) {
      searchText = searchText.toLowerCase();
      searchString = searchString.toLowerCase();
    }
    if (this.searchString !== '' && searchText.includes(searchString)) {
      highlight = true;
    }
    return {
      highlight: highlight
    };
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
