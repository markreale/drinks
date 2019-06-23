import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { DrinksService } from 'src/app/drinks.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    
currentUser = this.authService.userContent;

drinks: any;
  constructor(public authService: AuthService,
    public drinksService: DrinksService) { }

  ngOnInit() {
    this.drinksService.getDrinks().subscribe(data => {
        this.drinks = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          };
        })
  });
}

}
