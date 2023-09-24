import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Population} from "../../interfaces/population";
import {Collaborators} from "../../interfaces/Collaborators";
import {CollaboratorsAdd} from "../../interfaces/CollaboratorsAdd";

@Component({
  selector: 'app-update-collab-body',
  templateUrl: './update-collab-body.component.html',
  styleUrls: ['./update-collab-body.component.css']
})
export class UpdateCollabBodyComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<UpdateCollabBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private http: HttpClient,
    private toastr: ToastrService,

  ) {}

 collaborateur: CollaboratorsAdd = {
    id: 0,
    populationName: '',
    contratType: '',
    dureeTravail: '',
    dateDebutContrat: new Date(),
    dateFinContrat: new Date(),
    anciennete: 0,
    categorieSocioProfessionnelle: '',
    departement: '',
    genre: '',
    age: 0,
    niveauEducation: '',
    regionGeographique: '',
   firstname:'',
   lastname:'',
   email:'',
   password:0,
    collaborator: null, // Provide the appropriate value for the collaborator property
  };
  ngOnInit(): void {
    // Fetch the population data using the data.id from the backend and set it to 'population' object
    this.fetchCollabData();
  }
  fetchCollabData(): void {
    const url = `http://localhost:8282/collaborators/${this.data.id}`;
    this.http.get<CollaboratorsAdd>(url).subscribe(
      (response: CollaboratorsAdd) => {
        this.collaborateur = response;
      },
      (error: any) => {
        console.error('Failed to fetch population data:', error);
      }
    );
  }

  updateCollab(): void {
    const url = `http://localhost:8282/collaborators/${this.collaborateur.id}`;
    this.http.put<CollaboratorsAdd>(url, this.collaborateur).subscribe(
      (response: CollaboratorsAdd) => {
        console.log('collaborator updated successfully:', response);
        // If needed, you can do something with the response from the server here
        this.toastr.success("collaborator updated successfully", "Success", { timeOut: 3000 });
        this.dialogRef.close(true); // Indicate successful update to the parent component
      },
      (error: any) => {
        console.error('Failed to update collaborator:', error);
        // Handle error case
        this.toastr.error("Failed to update collaborator", "Error");
        this.dialogRef.close(false); // Indicate failure to the parent component
      }
    );
  }

  exitWithProgress(): void {
    this.toastr.error("Error", "Exit");
    this.dialogRef.close(false); // Close the dialog without updating
  }
}




