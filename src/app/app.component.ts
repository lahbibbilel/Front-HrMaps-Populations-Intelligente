import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {TokenService} from "./services/token.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Front-HrMaps-Populations-Intelligente';
  isadmin = false;
  isMenuVisible = false;

  constructor(private route: Router
    , private tokenservice: TokenService
  ) {
  }    // let role = sessionStorage.getItem('role');
    // if (role == 'admin') {
    //   this.isadmin = true;
    //  }
    // }

    // ngDoCheck(): void {
    // let currentroute = this.route.url;
    // let role = sessionStorage.getItem('role');
    // if (currentroute == '/login' || currentroute == '/register' || currentroute == '/') {
    //  this.isMenuVisible = false
    // } else {
    // this.isMenuVisible = true
    //}

    //if (role == 'admin') {
    //  this.isadmin = true;
    // } else {
    //   this.isadmin = false;
    //  }
    // }

    logout()
    {
      this.tokenservice.clearToken()
    }
  }
