import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-drinks,[app-drinks]',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit {

    @Input() drink: any;
  constructor() { }

  ngOnInit() {
  }

}
