
import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../interfaces/DialogData";
import {UserlistComponent} from "../userlist.component";
import {CollaboratorsService} from "../../services/collaborators.service";
import {Populations} from "../../interfaces/populations";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {CollaboratorDataServiceService} from "../../services/collaborator-data-service.service";
import {Collaborators} from "../../interfaces/Collaborators";
import {CollaboratorsAdd} from "../../interfaces/CollaboratorsAdd";

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})
export class DialogBodyComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserlistComponent>,
    private collaboratorService: CollaboratorsService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private http: HttpClient,
    private toastr: ToastrService,
    private collabUpdateService: CollaboratorDataServiceService,

  ) {}

  showProgress: boolean = false; // Flag to show/hide the progress indicator

  collaborator: CollaboratorsAdd = {
    id: 0,
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
    populationName: '',
    firstname:'',
    lastname:'',
    email:'',
    password:0,
    collaborator: '',
  };

  ngOnInit(): void {


  }






  // Function to exit the modal and show progress
  exitWithProgress(): void {
    this.showProgress = true; // Show the progress indicator

  this.toastr.error("nothing added")
    // Here, you can add any additional logic or processing you want to perform before closing the modal
    setTimeout(() => {
      this.dialogRef.close(); // Close the modal after some processing (you can replace this with your actual logic)
      this.showProgress = false; // Hide the progress indicator after closing the modal
    }, 1000); // Replace 2000 with the time (in milliseconds) it takes to perform your additional processing
  }

  async addCollaborator(): Promise<void> {
    this.collaboratorService.insertCollaborator(this.collaborator).subscribe(
      (response: any) => {
        console.log('Collaborator added successfully.');
        // Additional logic after adding the collaborator
        this.getPopulationsAndPerformComparison(response.id); // Compare the collaborator with populations
        this.collabUpdateService.emitNewCollaborator(response);

      },
      (error: any) => {
        console.error('Failed to add collaborator:', error);
        // Handle error case
      }
    );
  }





  async getPopulationsAndPerformComparison(collaboratorId: number): Promise<void> {
    try {
      const url = 'http://localhost:8282/populations';

      const token = localStorage.getItem('access_token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.dialogRef.disableClose = true; // Disable closing the dialog until we explicitly close it

      this.http.get<Populations[]>(url, { headers }).subscribe(
        (populations: Populations[]) => {
          console.log('All populations:', populations);

          if (populations && populations.length > 0) {
            let compatiblePopulationId: number | null = null;
            let compatiblePopulationFound = false; // Flag to check if any compatible population is found

            for (const population of populations) {
              const populationId = population.id;
              const comparisonUrl = `http://localhost:8282/populations/${populationId}/collab/${collaboratorId}`;

              this.http.put(comparisonUrl, null).subscribe(
                (response: any) => {
                  console.log(`Population comparison result for population ${populationId}:`, response);

                  if (response === 'tous vas bien') {
                    // Population and collaborator are compatible
                    compatiblePopulationFound = true;
                    compatiblePopulationId = populationId;
                  }
                },
                (error: any) => {
                  console.error(`Population comparison error for population ${populationId}:`, error);

                  // You can choose to handle other errors here if needed

                },
                () => {
                  // This block executes after each HTTP request is complete (success or error)

                  // If no compatible population is found after all comparisons, show an error toaster
                  if (population === populations[populations.length - 1] && !compatiblePopulationFound) {
                    this.toastr.error('Data not compatible with any population.', 'Error');
                    this.dialogRef.close(); // Close the dialog after showing the error toaster
                  } else if (compatiblePopulationFound && compatiblePopulationId !== null) {
                    // If a compatible population is found, show the success toaster
                    this.toastr.success(`Data compatible with population ${compatiblePopulationId}.`, 'Success');
                    this.dialogRef.close(); // Close the dialog after showing the success toaster
                  }
                }
              );
            }
          } else {
            // Show toaster message when there are no populations for comparison
            this.toastr.success('Collaborator Add with success', 'Success');
            this.toastr.warning('No populations available for comparison.', 'Warning');
            this.dialogRef.close(); // Close the dialog after showing the warning toaster
          }
        },
        (error: any) => {
          console.error('Failed to get populations:', error);

          // Handle error case for fetching populations
          this.toastr.error('Failed to get populations. Please try again later.', 'Error');

          this.dialogRef.close(); // Close the dialog after showing the error toaster
        }
      );
    } catch (error: any) {
      console.error('Failed to get populations or perform comparison:', error);

      // Handle other error cases
      this.toastr.error('An error occurred. Please try again later.', 'Error');
      this.dialogRef.close(); // Close the dialog after showing the error toaster
    }
  }
}
