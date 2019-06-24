import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { DrinksService } from 'src/app/drinks.service';
import { UsersService } from 'src/app/users.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    currentUser = this.authService.userContent;
    currentTime = new Date();
    eightHoursCount = 0;
    drinksLeft = 0;

    drinks: any;
    user: any;
    constructor(
        public authService: AuthService,
        public drinksService: DrinksService,
        public usersService: UsersService
    ) { }

    ngOnInit() {

        this.usersService.getUser().subscribe(data => {
            console.log(data);
            if (data) {
                this.user = data;
            }
            else {
                this.user = {
                    hoursThreshold: 8,
                    maxDrinks: 3
                }
            }

        });


        this.drinksService.getDrinks().subscribe(data => {
            this.eightHoursCount = 0;
            this.drinks = data.map(e => {
                return {
                    id: e.payload.doc.id,
                    ...e.payload.doc.data()
                };
            });
            for (let i = 0; i < this.drinks.length; i++) {
                console.log(this.drinks[i].date.seconds);
                console.log(this.currentTime.getTime() / 1000);
                if ((this.currentTime.getTime() / 1000 - (60 * 60 * (this.user.hoursThreshold ? this.user.hoursThreshold : 8))) < this.drinks[i].date.seconds) {
                    console.log('danger');
                    this.eightHoursCount += 1;
                }
                this.currentTime = new Date();
                console.log(this.user.maxDrinks);
                this.drinksLeft = this.user.maxDrinks - this.eightHoursCount;
                this.drinksLeft = this.drinksLeft >= 0 ? this.drinksLeft : 0;
                this.drinks[i].since = this.currentTime.getTime() / 1000 - this.drinks[i].date.seconds;
            }

        });


    }

    create() {
        let newDrink: any = {};

        newDrink.drink = "beer";
        newDrink.userId = this.currentUser.uid;

        this.drinksService.createDrink(newDrink);
    }


}
