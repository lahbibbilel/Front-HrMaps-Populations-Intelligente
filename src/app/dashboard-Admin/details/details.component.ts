import {Component, Inject, OnInit} from '@angular/core';
import {CollaboratorsAdd} from "../../interfaces/CollaboratorsAdd";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Populations} from "../../interfaces/populations";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { populationId: number },
    private http: HttpClient,
    private toastr: ToastrService,

  ) {}


  population!: Populations


  ngOnInit(): void {
    const url = `http://localhost:8282/populations/${this.data.populationId}`;
    this.http.get<Populations>(url).subscribe(
      (response: Populations) => {
        this.population = response;
      },
      (error: any) => {
        console.error('Failed to fetch population data:', error);
      }
    );
  }

  closeDialog(): void {
    this.toastr.success("consulted")
    this.dialogRef.close(false); // Indicate cancellation to the parent component
  }

}
