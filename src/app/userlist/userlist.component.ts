import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {EmployeesGet} from "../interfaces/employeesGet";
import {MaterialModule} from "../../material.module";
import {MatDialog} from "@angular/material/dialog";
import {DialogBodyComponent} from "./dialog-body/dialog-body.component";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {Collaborators} from "../interfaces/Collaborators";
import {Router} from "@angular/router";
import {catchError, delay, Observable, of, switchMap, throwError} from "rxjs";
import {TokenService} from "../services/token.service";
import {PopulationServiceService} from "../services/population-service.service";
import {ToastrService} from "ngx-toastr";
import {Populations} from "../interfaces/populations";
import {NgClass} from "@angular/common";
import {
  UpdatePopulationBodyComponent
} from "../dashboard-Admin/update-population-body/update-population-body.component";
import {
  DeletePopulationBodyComponent
} from "../dashboard-Admin/delete-population-body/delete-population-body.component";
import {DeleteCollabBodyComponent} from "./delete-collab-body/delete-collab-body.component";
import {UpdateCollabBodyComponent} from "./update-collab-body/update-collab-body.component";
import {CollaboratorDataServiceService} from "../services/collaborator-data-service.service";
import {GetpopulationNameBodyComponent} from "./getpopulation-name-body/getpopulation-name-body.component";
import {CollaboratorsAdd} from "../interfaces/CollaboratorsAdd";
import {DetailsCollaboratorComponent} from "./details-collaborator/details-collaborator.component";
export interface EmployeeT {
  id: number;
  firstname: string | null;
  lastname: string;
  email: string;
  password: string;
  image: string | null;
  role: string;
  enabled: boolean;
  accountNonLocked: boolean;
  username: string;
  authorities: Authority[];
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
}

export interface Authority {
  authority: string;
}


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MaterialModule, FormsModule, MatIconModule, NgClass],
})
export class UserlistComponent implements OnInit,AfterViewInit {
//  animal!: string;
//  name!: string;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog, private router: Router
    , private tokenService: TokenService
    , private populationService: PopulationServiceService, private toastr: ToastrService
  ,
    private collabUpdateService: CollaboratorDataServiceService,

  ) {

  }
  ngOnInit(): void {
    this.fetchCollaborators();
  //  this.dataSource.data.push(this.populationName);

    // Subscribe to the new population event to update the table
    this.collabUpdateService.getNewPopulationSubject().subscribe((newPopulation: Collaborators) => {
      this.dataSource.data.push(newPopulation);
      this.dataSource._updateChangeSubscription();
    });
  }
  displayedColumns: string[] = ['id','firstname','lastname','contratType', 'dureeTravail', 'dateDebutContrat', 'dateFinContrat',
    'anciennete', 'categorieSocioProfessionnelle', 'departement', 'genre', 'age',
    'niveauEducation', 'regionGeographique', 'populationName',
    'update', 'delete','details','saving'];
  //'firstname','lastname','email','password',
  dataSource!: MatTableDataSource<Collaborators>;

  coll!:CollaboratorsAdd

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBodyComponent, {
//      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    //  this.animal = result;
    });
  }


  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  fetchCollaborators(): void {
    this.http.get<Collaborators[]>('http://localhost:8282/collaborators/all').subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Collaborators>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        // Check if there is a populationName saved in local storage for each collaborator
        this.dataSource.data.forEach((row) => {
          const populationName = localStorage.getItem(`populationName_${row.id}`);
          if (populationName) {
            row.populationName = populationName;
          }
        });
      },
      error => {
        console.error(error);

      }
    );
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /* updatePopulationWithCollaborator(row: Collaborators): void {
     const id = 1;
     const collaboratorId = row.id; // Replace with the correct collaborator ID

     this.http
       .put(`http://localhost:8282/populations/${id}/collaborator/${collaboratorId}`, {})
       .subscribe((response)=> {
         //debugger;
         console.log(response);
      if (response === 'error  bro') {
               this.toastr.error('Data not compatible', 'Error');
               // Perform any additional actions for a session expired error
             } else {
               this.toastr.success('Population updated successfully with collaborator data.', 'Success');
               console.log('Population updated successfully with collaborator data');}}
               // Perform additional logic or update the user interface after a successful population update

       );
 }
 */
  updatePopulationWithCollaborator(row: Collaborators): void {
    const collaboratorId = row.id;

    this.getPopulations().subscribe((populations) => {
      if (!populations) {
        // If populations is null, call the delete API and show toaster warning
        this.http
          .delete<Collaborators>(`http://localhost:8282/collaborators/${collaboratorId}`)
          .subscribe((response) => {
            console.log(response);
            this.toastr.warning('No compatible population found.', 'Warning');
            row.populationName = '';
          });
        return; // Exit the function early
      }

      let compatiblePopulation: Populations | undefined;

      populations.forEach((population) => {
        if (this.isPopulationCompatible(population, row)) {
          compatiblePopulation = population;
        }
      });

      if (compatiblePopulation && compatiblePopulation.id) {
        const populationId = compatiblePopulation.id;

        // Update the collaborator object with the compatible population's name
        row.populationName = compatiblePopulation.populationName;

        // Send the updated collaborator object to the API
        this.http
          .put<Collaborators>(
            `http://localhost:8282/populations/${populationId}/collab/${collaboratorId}`,
            row
          )
          .subscribe(
            (response) => {
              console.log(response);
              this.toastr.success(
                'Population updated successfully with collaborator data.',
                'Success'
              );
              console.log('Population updated successfully with collaborator data');

              // Perform any additional actions or update the user interface after a successful population update
            },
            (error) => {
              console.error(error);
              this.toastr.error('Data not compatible', 'Error');
              // Perform any additional actions for an error during the population update
            }
          );
      } else {
        // Show toastr message when there is no compatible population
      //  this.toastr.error('Not existing Any Population in Application', 'Error');
        row.populationName = '';

        // Also, call the delete API and show toaster warning in this case
        this.http
          .delete<Collaborators>(`http://localhost:8282/collaborators/${collaboratorId}`)
          .subscribe((response) => {
            console.log(response);
            this.toastr.warning('No compatible population found.', 'Warning');
            row.populationName = '';
          });
      }
    });
  }
//genre eliminer
  isPopulationCompatible(population: Populations, row: Collaborators): boolean {
    return (
      population.contratType === row.contratType &&
      population.dureeTravail === row.dureeTravail &&
      population.dateDebutContrat === row.dateDebutContrat &&
      population.dateFinContrat === row.dateFinContrat &&
      population.anciennete === row.anciennete &&
      population.categorieSocioProfessionnelle === row.categorieSocioProfessionnelle &&
      population.departement === row.departement &&
      //population.genre === row.genre&&
      population.age === row.age &&
      population.niveauEducation === row.niveauEducation &&
      population.regionGeographique === row.regionGeographique
    );
  }


  getPopulations(): Observable<Populations[]> {
    return this.http.get<Populations[]>('http://localhost:8282/populations');
  }

  openUpdatedList(populationId: number): void {
    const dialogRef = this.dialog.open(UpdateCollabBodyComponent, {
      data: { id: populationId }, // Pass the populationId as data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // You can perform any actions after the dialog is closed if needed
      // For example, you can refresh the data source to reflect the changes
      this.fetchCollaborators();
    });
  }

  openDeleteCollab(collabId: number): void {
    const dialogCollab = this.dialog.open(DeleteCollabBodyComponent, {
      data: { id: collabId },
    });

    dialogCollab.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // Population was deleted, update the table
        this.fetchCollaborators();
      }
    });
  }
  openPopulation(populationName: string): void {
    const dialogCollab = this.dialog.open(GetpopulationNameBodyComponent, {
      data: { populationname: populationName },
    });
  }


  openDetails(collabId: number): void {
    const dialogCollab = this.dialog.open(DetailsCollaboratorComponent, {
      data: { collabId: collabId },
    });
  }


   // dialogCollab.afterClosed().subscribe((result: boolean) => {
   //   if (result) {
        // Population was deleted, update the table
  //      this.fetchCollaborators();
  //    }
  //  });

}
