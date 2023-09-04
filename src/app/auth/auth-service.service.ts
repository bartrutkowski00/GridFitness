import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from './user.model';
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
} from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private router: Router, private afs: Firestore) {}
  _user = new BehaviorSubject<User | null>(null);

  loggingin: boolean = false;

  async googleSingIn() {
    this.loggingin = true;

    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = {
        uId: result.user.uid,
        email: result.user.email,
        photoUrl: result.user.photoURL,
        displayName: result.user.displayName,
        accessToken: credential?.accessToken,
      };
      this._user?.next(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
      console.log(err);
    }
    this.loggingin = false;
  }

  logOut() {
    this._user?.next(null);
    localStorage.removeItem('user');
  }

  autoLogIn() {
    const user = localStorage.getItem('user');
    if (!user) {
      this._user.next(null);
    } else {
      this._user.next(JSON.parse(String(user)));
    }
  }
}
