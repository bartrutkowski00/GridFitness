import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from './user.model';
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
} from '@angular/fire/auth';
import { Firestore, getDoc, getFirestore, doc } from '@angular/fire/firestore';
import { setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private router: Router, private afs: Firestore) {}
  _user = new BehaviorSubject<User | null>(null);

  loggingin: boolean = false;
  db: any = getFirestore();

  async googleSingIn() {
    this.loggingin = true;

    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user: User = {
        uId: result.user.uid,
        email: result.user.email,
        photoUrl: result.user.photoURL,
        displayName: result.user.displayName,
        accessToken: credential?.accessToken,
      };
      this._user?.next(user);
      localStorage.setItem('user', JSON.stringify(user));
      let userIsInDatabase = await this.checkIfUserIsInDb(user);

      if (!userIsInDatabase) {
        this.exportUserToDb(user);
      }
    } catch (err) {
      console.log(err);
    }

    this.loggingin = false;
  }

  async checkIfUserIsInDb(user: User) {
    try {
      const docRef = doc(this.db, 'users', String(user?.uId));
      const docSnap = await getDoc(docRef);
      return docSnap.exists();
    } catch (e) {
      console.error('Error: ', e);
      return false;
    }
  }

  async exportUserToDb(user: User) {
    try {
      const docRef = doc(this.db, 'users', String(user?.uId));
      await setDoc(docRef, user);
    } catch (e) {
      console.error('Error: ', e);
    }
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

    console.log(this._user);
  }
}
