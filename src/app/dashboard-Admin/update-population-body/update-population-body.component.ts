import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PopulationsComponent} from "../populations/populations.component";
import {Population} from "../../interfaces/population";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-update-population-body',
  templateUrl: './update-population-body.component.html',
  styleUrls: ['./update-population-body.component.css']
})
export class UpdatePopulationBodyComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UpdatePopulationBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private http: HttpClient,
    private toastr: ToastrService,

  ) {}

  population : Population
= {
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
  regionGeographique: ''
}
  ngOnInit(): void {
    // Fetch the population data using the data.id from the backend and set it to 'population' object
    this.fetchPopulationData();
  }
  fetchPopulationData(): void {
    const url = `http://localhost:8282/populations/${this.data.id}`;
    this.http.get<Population>(url).subscribe(
      (response: Population) => {
        this.population = response;
      },
      (error: any) => {
        console.error('Failed to fetch population data:', error);
      }
    );
  }

  updatePopulation(): void {
    const url = `http://localhost:8282/populations/${this.population.id}`;
    this.http.put<Population>(url, this.population).subscribe(
      (response: Population) => {
        console.log('Population updated successfully:', response);
        // If needed, you can do something with the response from the server here
        this.toastr.success("Population updated successfully", "Success", { timeOut: 3000 });
        this.dialogRef.close(true); // Indicate successful update to the parent component
      },
      (error: any) => {
        console.error('Failed to update population:', error);
        // Handle error case
        this.toastr.error("Failed to update population", "Error");
        this.dialogRef.close(false); // Indicate failure to the parent component
      }
    );
  }

  exitWithProgress(): void {
    this.toastr.error("Error", "Exit");
    this.dialogRef.close(false); // Close the dialog without updating
  }
}





