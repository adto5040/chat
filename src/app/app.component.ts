import { Component } from '@angular/core';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn$ = this.localStorageService.isLoggedIn$;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit() {}

  onLogout() {
    this.localStorageService.removeUser();
    this.router.navigate(['/']);
  }
}
