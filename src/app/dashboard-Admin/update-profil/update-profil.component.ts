import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {Population} from "../../interfaces/population";
//import {Profil} from "../../interfaces/profil";
import {ToastrService} from "ngx-toastr";
import {DomSanitizer} from "@angular/platform-browser";

interface Authority {
  authority: string;
}
interface employees {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  image: string; // Change the type to string


}


@Component({
  selector: 'app-update-profil',
  templateUrl: './update-profil.component.html',
  styleUrls: ['./update-profil.component.css']
})
export class UpdateProfilComponent implements OnInit {

  profil: employees = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    image: ""


  };

  constructor(
    public dialogRef: MatDialogRef<UpdateProfilComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }, // Make sure the data object has an "id" property
    private http: HttpClient,
    private toastr: ToastrService,
    private sanitizer:DomSanitizer
  ) {}
  selectedFile: File = new File([], '');

  ngOnInit(): void {
    // Fetch the population data using the data.id from the backend and set it to 'profil' object
    this.fetchEmployeesData();
  }

  fetchEmployeesData(): void {
    const url = `http://localhost:8282/employees/${this.data.id}`;
    this.http.get<employees>(url).subscribe(
      (response: employees) => {
        this.profil = response;
      },
      (error: any) => {
        console.error('Failed to fetch population data:', error);
      }
    );
  }
  updateEmployees(): void {
    const url = `http://localhost:8282/employees/${this.data.id}`;

    // Create a new object without the 'password' property
    const { password, ...profileWithoutPassword } = this.profil;

    this.http.put<employees>(url, profileWithoutPassword).subscribe(
      (response: employees) => {
        console.log('Employee updated successfully:', response);
        this.toastr.success('Profile updated successfully!');
        this.dialogRef.close(response); // Pass the updated profile back to the parent component
      },
      (error: any) => {
        // Handle errors
        this.toastr.error('Failed to update profile. Please try again later.');
        this.dialogRef.close(null); // Indicate that the update was not successful
      }
    );
  }


  // ...

  exitWithProgress(): void {
    this.toastr.error("not updated")
    this.dialogRef.close(); // Close the dialog without updating
  }
  getImageUrl(image: string): any {
    return this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64, ${image}`);
  }

  onFileSelected(event: Event) {
    const element = event.target as HTMLInputElement;
    if (element && element.files && element.files.length > 0) {
      const file = element.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          const base64String = e.target.result.toString().split(',')[1]; // Extract the base64 string from the data URL
          this.profil.image = base64String; // Store the base64 representation of the image
        } else {
          // Handle the case when e.target or e.target.result is null (optional)
        }
      };
      reader.readAsDataURL(file);
    }
  }

}
