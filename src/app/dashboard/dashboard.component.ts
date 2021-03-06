import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  name = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)
  ]);

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkUser();
  }

  setName() {
    if (this.name.valid && this.name.value.trim().toLowerCase() !== 'chatbot') {
      this.localStorageService.setUsername(this.name.value.trim());
      this.name.reset();
      this.checkUser();
    }
  }

  private checkUser() {
    const user = this.localStorageService.getUser();
    if (user) {
      this.router.navigate(['/chat']);
    }
  }
}
