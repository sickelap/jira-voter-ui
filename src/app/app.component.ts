import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'pp-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth: AuthService) {
  }

  get username(): string {
    return this.auth.username;
  }

  logout(): void {
    this.auth.logout();
  }
}
