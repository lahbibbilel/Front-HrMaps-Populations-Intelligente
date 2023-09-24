import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DialogBodyComponent} from "../../dashboard-Admin/dialog-body/dialog-body.component";
import {Populations} from "../../interfaces/populations";
import {UpdatePopulationBodyComponent} from "../update-population-body/update-population-body.component";
import {DeletePopulationBodyComponent} from "../delete-population-body/delete-population-body.component";
import {PopulationDataServiceService} from "../../services/population-data-service.service";
import {DetailsCollaboratorComponent} from "../../userlist/details-collaborator/details-collaborator.component";
import {DetailsComponent} from "../details/details.component";

@Component({
  selector: 'app-populations',
  templateUrl: './populations.component.html',
  styleUrls: ['./populations.component.css']

})
export class PopulationsComponent implements OnInit {
  constructor(private http: HttpClient,
              private populationUpdateService : PopulationDataServiceService,
              public dialog: MatDialog) { }
  ngOnInit(): void {
    this.fetchCollaborators();

    // Subscribe to the new population event to update the table
    this.populationUpdateService.getNewPopulationSubject().subscribe((newPopulation: Populations) => {
      this.dataSource.data.push(newPopulation);
      this.dataSource._updateChangeSubscription();
    });
  }
  displayedColumns: string[] = ['id','populationName', 'contratType', 'dureeTravail', 'dateDebutContrat', 'dateFinContrat',
    'anciennete','categorieSocioProfessionnelle','departement','genre','age','niveauEducation','regionGeographique','populationCount','update','delete','details'];
  dataSource!: MatTableDataSource<Populations>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;






  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBodyComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  openUpdatedList(populationId: number): void {
    const dialogRef = this.dialog.open(UpdatePopulationBodyComponent, {
      data: { id: populationId }, // Pass the populationId as data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // You can perform any actions after the dialog is closed if needed
      // For example, you can refresh the data source to reflect the changes
      this.fetchCollaborators();
    });
  }

  openDeletePopulation(populationId: number): void {
    const dialogRef = this.dialog.open(DeletePopulationBodyComponent, {
      data: { id: populationId },
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // Population was deleted, update the table
        this.fetchCollaborators();
      }
    });
  }



  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  fetchCollaborators(): void {
    this.http.get<Populations[]>('http://localhost:8282/populations').subscribe(
      data => {
        // Mettez à jour la propriété "populationCount" pour chaque élément de données
        data.forEach(population => {
          this.http.get<number>(`http://localhost:8282/collaborators/population-count/${population.populationName}`).subscribe(
            count => {
              population.populationCount = count;
            },
            error => {
              console.error(error);
            }
          );
        });

        this.dataSource = new MatTableDataSource<Populations>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

  openDetails(populationId: number): void {
    const dialogPopulation = this.dialog.open(DetailsComponent, {
      data: { populationId: populationId },
    });
  }

}
