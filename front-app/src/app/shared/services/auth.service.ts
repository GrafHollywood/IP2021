import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {
  }
  getUser() {
    return this.afAuth.currentUser;
  }

  doLoginEmail(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  doLogOut() {
    return firebase.auth().signOut()
  }
}
