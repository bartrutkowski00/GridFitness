import { Component } from '@angular/core';
import { AuthServiceService } from '../auth/auth-service.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private auth: AuthServiceService) {
    auth._user?.subscribe((user) => {
      this.user = user;
    });
  }
  user: User | null | undefined;
  onLogOut() {
    this.auth.logOut();
  }
  onLogIn() {
    this.auth.googleSingIn();
  }
}
