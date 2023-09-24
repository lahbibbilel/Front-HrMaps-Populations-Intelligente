import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Populations} from "../../interfaces/populations";

@Component({
  selector: 'app-getpopulation-name-body',
  templateUrl: './getpopulation-name-body.component.html',
  styleUrls: ['./getpopulation-name-body.component.css']
})
export class GetpopulationNameBodyComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<GetpopulationNameBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { populationname: string },
    private http: HttpClient,
    private toastr: ToastrService,

  ) {}



population!: Populations


  ngOnInit(): void {
    const url = `http://localhost:8282/populations/population/${this.data.populationname}`;
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
