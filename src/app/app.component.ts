import { Component } from '@angular/core';
import { LocalStorageService } from '../shared/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn$ = this.localStorageService.isLoggedIn$;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit() {}

  onLogout() {
    this.localStorageService.removeUser();
  }
}
