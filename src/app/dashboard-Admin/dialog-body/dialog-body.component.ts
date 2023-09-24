import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PopulationServiceService} from "../../services/population-service.service";
import {Populations} from "../../interfaces/populations";
import {MatDialogRef} from "@angular/material/dialog";
import {PopulationsComponent} from "../populations/populations.component";
import {HttpClient} from "@angular/common/http";
import {Population} from "../../interfaces/population";
import {ToastrService} from "ngx-toastr";
import {Subject} from "rxjs";
import {PopulationDataServiceService} from "../../services/population-data-service.service";

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})
export class DialogBodyComponent implements OnInit {


  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PopulationsComponent>,
    private populationService: PopulationServiceService
    , private http: HttpClient,
    private toaster:ToastrService,
    private populationUpdateService: PopulationDataServiceService,


  ) {
  }
  newPopulationSubject: Subject<Populations> = new Subject<Populations>();

  showProgress: boolean = false; // Flag to show/hide the progress indicator

  ngOnInit(): void {
  }

  population: Population = {
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
  };
  addPopulation(): void {
    this.http.post<Populations>('http://localhost:8282/populations', this.population).subscribe(
      (response: Populations) => {
        console.log('Population added successfully:', response);
        this.toaster.success('added with success');
        this.dialogRef.close('true');

        // Emit the new population event to notify other components
        this.populationUpdateService.emitNewPopulation(response);
      },
      (error: any) => {
        console.error('Failed to add population:', error);
        // Handle error case
      }
    );
  }
  exitWithProgress(): void {
    this.showProgress = true; // Show the progress indicator
   this.toaster.error('any data add')
    setTimeout(() => {
      this.dialogRef.close(); // Close the modal after some processing (you can replace this with your actual logic)
      this.showProgress = false; // Hide the progress indicator after closing the modal
    }, 2000); // Replace 2000 with the time (in milliseconds) it takes to perform your additional processing
  }

}
