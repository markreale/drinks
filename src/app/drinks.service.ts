import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DrinksService {

  constructor(
    private db: AngularFirestore,
    private authService: AuthService) { }

    
  currentUser = this.authService.userContent;


    getDrinks() {
        return this.db.collection('drinks', ref => ref.where("userId", "==", this.currentUser.uid).orderBy('date', 'desc')).snapshotChanges();
    }

    createDrink(drink: any){
        if(drink.id){
          return this.db.collection('drinks').doc(drink.id).set(drink);

        }
        else {
        let newDrink = drink    
        newDrink.date = new Date();
        console.log(newDrink);
          return this.db.collection('drinks').add(newDrink);
        }
    }
}
