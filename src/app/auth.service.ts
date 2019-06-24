import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

// makes it able to be used as a Provider in App Module - app.module.ts
@Injectable({
    providedIn: 'root'
})

export class AuthService {

    userContent: any;

    constructor(
        public router: Router,
        public afAuth: AngularFireAuth
    ) {
        // TODO - confirm that this subscribes to whenever the auth state changes?
        // TODO - determine why it's good to put user data into storage?
        this.afAuth.authState.subscribe(user => {
            if (user) {
                sessionStorage.setItem('user', JSON.stringify(user));
            } else {
                sessionStorage.setItem('user', null);
            }
        })
    }

    get isLoggedIn(): boolean {
        const user = JSON.parse(sessionStorage.getItem('user'));
        this.userContent = user;
        return (user !== null) ? true : false;
    }

    async  loginWithGoogle() {
        return this.AuthLogin(new auth.GoogleAuthProvider());
    }

    // Auth logic to run auth providers
    async AuthLogin(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
            .then((result) => {
                this.router.navigate(['dashboard']);
            }).catch((error) => {
                window.alert(error)
            })
    }
    // Sign out 
    async SignOut() {
        return this.afAuth.auth.signOut().then(() => {
            sessionStorage.removeItem('user');
            this.router.navigate(['login']);
            window.location.reload();
        })
    }


}
