import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DrinksService {

  constructor(
    private db: AngularFirestore) { }

    getDrinks() {
        return this.db.collection('things', ref => ref.where("userId", "==", 'public')).snapshotChanges();
    }
}
