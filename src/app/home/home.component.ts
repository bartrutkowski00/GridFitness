import { Component } from '@angular/core';
import { AuthServiceService } from '../auth/auth-service.service';
import { User } from '../auth/user.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private auth: AuthServiceService) {
    auth._user.pipe(take(1)).subscribe((user) => {
      this.user = user;
    });
  }

  userSub = this.auth._user.subscribe((user) => {
    this.user = user;
    console.log(this.user);
  });
  user: User | null = null;
}
