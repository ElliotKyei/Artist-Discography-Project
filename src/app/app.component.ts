/*********************************************************************************
* WEB422 – Assignment 06
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or
* distributed to other students.
*
* Name: Elliot Kyei    Student ID: 122982192     Date: 4/9/2021
*
********************************************************************************/

import { Component } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { AuthService } from './auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( private router: Router, private auth: AuthService ){}

  title = 'web422-a4';
  searchString!: string;
  token: any;

  ngOnInit(): void{
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.token = this.auth.readToken();
        console.log("Token is ", this.token)
      }
    });
  }

  handleSearch(){
    this.router.navigate(['/search'], { queryParams: { q: this.searchString } });
    this.searchString = "";
  }

  logout(){
    localStorage.clear();
    this.router.navigate(["/login"]);
  }

}
