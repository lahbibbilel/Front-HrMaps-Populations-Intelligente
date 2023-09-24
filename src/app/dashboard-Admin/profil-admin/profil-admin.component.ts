import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {Employees} from "../../interfaces/employees";
import {ActivatedRoute, Router} from "@angular/router";
import {Profil} from "../../interfaces/profil";
import {AuthService} from "../../services/auth.service";
import {TokenService} from "../../services/token.service";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {PopulationServiceService} from "../../services/population-service.service";
import {ToastrService} from "ngx-toastr";
import {MatTableDataSource} from "@angular/material/table";
import {Collaborators} from "../../interfaces/Collaborators";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DialogBodyComponent} from "../../userlist/dialog-body/dialog-body.component";
import {UpdateProfilComponent} from "../update-profil/update-profil.component";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-profil-admin',
  templateUrl: './profil-admin.component.html',
  styleUrls: ['./profil-admin.component.css']
})
export class ProfilAdminComponent implements OnInit {
  employees: any;
  authenticatedUser: any;
  loading: boolean = true;
  error: string | null = null;

  constructor(private userService: AdminService,
              private tokenService: TokenService,
              public dialog: MatDialog,
              private toastr: ToastrService
, private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
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


  getAuthenticatedUser(): void {
    const token = this.tokenService.getToken();
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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
// ...

  openDialog(): void {
    if (this.authenticatedUser && this.authenticatedUser.id) {
      const dialogRef = this.dialog.open(UpdateProfilComponent, {
        data: { id: this.authenticatedUser.id, profile: this.authenticatedUser },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.authenticatedUser = result; // Update the authenticated user with the updated profile
//          this.toastr.success('Profile updated successfully!');
        }
      });
    } else {
      console.error('Authenticated user or ID is undefined.');
    }
  }

// ...

  // Method to refresh employee data
  refreshEmployeesData(): void {
    const url = `http://localhost:8282/employees`; // Change the URL to your API endpoint
    this.userService.getUsers().subscribe(
      (response) => {
        this.employees = response;
   //     console.log('Updated Employees:', this.employees);
    //    this.toastr.success('Employee updated successfully!');
      },
      (error) => {
        console.error('Failed to fetch updated employees data:', error);
        this.toastr.error('Failed to update employee data.');
      }
    );
  }


  getImageUrl(image: string): any {
    return this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64, ${image}`);
  }
}








