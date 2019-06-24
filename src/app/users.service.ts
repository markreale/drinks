import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth.service';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(
    private db: AngularFirestore,
    private authService: AuthService) { }

    currentUser = this.authService.userContent;
    
    private itemDoc: AngularFirestoreDocument;


    getUser() {
        let userCollection = 'users/' + this.currentUser.uid;
         this.itemDoc = this.db.doc(userCollection);
        
        return this.itemDoc.valueChanges();
    }

    updateUser(newSettings){
          return this.db.collection('users').doc(this.currentUser.uid).set(newSettings);
    }
}
