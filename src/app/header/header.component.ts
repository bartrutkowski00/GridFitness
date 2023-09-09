import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthServiceService } from '../auth/auth-service.service';
import { User } from '../auth/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private auth: AuthServiceService) {
    auth.autoLogIn();
    this.userSub = auth._user?.subscribe((user) => {
      this.user = user;
    });
  }
  userSub: Subscription;
  user: User | null | undefined;
  onLogOut() {
    this.auth.logOut();
  }
  onLogIn() {
    this.auth.googleSingIn();
  }

  ngOnInit() {
    this.auth.autoLogIn();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
