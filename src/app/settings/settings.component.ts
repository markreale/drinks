import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { UsersService } from 'src/app/users.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  hours = new FormControl('');
  maxdrinks = new FormControl('');

  constructor(
    public authService: AuthService,
    public usersService: UsersService
  ) { }

  ngOnInit() {
  }

  update(){
    console.log('update ctrlr');
    let newSettings = {
        hoursThreshold: this.hours.value,
        maxDrinks: this.maxdrinks.value
    };
    this.usersService.updateUser(newSettings);
  }

}
