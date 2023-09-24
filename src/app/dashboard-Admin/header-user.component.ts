import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TokenService} from "../services/token.service";
import {AdminService} from "../services/admin.service";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-dashboard-Admin',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {

  employees: any;
  authenticatedUser: any;
  loading: boolean = true;
  error: string | null = null;


  constructor(private router:Router,private route: Router
    , private tokenservice: TokenService,
              private userService: AdminService,
              public dialog: MatDialog,
              private toastr: ToastrService
    , private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (response) => {
        this.employees = response;
        console.log('Employees:', this.employees);
        this.loading = false;
        this.error = null;
        this.getAuthenticatedUser();
      },
      (error) => {
        this.loading = false;
        this.error = "Failed to fetch employees. Please try again later.";
        console.error(error);
      }
    );


  }
  redirectToUser() {
    this.router.navigate(['dashboard/user']);
  }

  badgevisible = false;
  badgevisibility() {
    this.badgevisible = true;}


  getImageUrl(image: string): any {
    return this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64, ${image}`);
  }


  logout()
  {
    this.tokenservice.clearToken()
  }

  redirectToHome() {
    this.router.navigate(['dashboard/home']);

  }

  getAuthenticatedUser(): void {
    const token = this.tokenservice.getToken();
    if (token) {
      const payload = token.split('.')[1];
      const decodedPayload = window.atob(payload);
      const parsedPayload = JSON.parse(decodedPayload);

      // Verify property names in the payload and use appropriate properties
      const emailFromToken = parsedPayload.email || parsedPayload.sub;
      console.log('Email from Token:', emailFromToken); // Check the value of emailFromToken

      // Find the matching employee based on the email from the token
      const matchingEmployee = this.employees.find((employee: any) => employee.email === emailFromToken);
      console.log('Matching Employee:', matchingEmployee); // Check the value of matchingEmployee

      if (matchingEmployee) {
        this.authenticatedUser = matchingEmployee; // Set authenticatedUser with the whole employee object
      } else {
        // Handle the case when the employee with the email from the token is not found in the list
        this.authenticatedUser = null;
      }
    }
  }

}
