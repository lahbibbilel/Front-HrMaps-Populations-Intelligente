import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-delete-population-body',
  templateUrl: './delete-population-body.component.html',
  styleUrls: ['./delete-population-body.component.css']
})
export class DeletePopulationBodyComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeletePopulationBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public populationData: { id: number },
    private http: HttpClient,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  deletePopulation(): void {
    const url = `http://localhost:8282/populations/${this.populationData.id}`;
    this.http.delete(url).subscribe(
      (response: any) => {
        console.log('Population deleted successfully:', response);
        this.toastr.success("remove with success")
        this.dialogRef.close(true); // Indicate successful deletion to the parent component
      },
      (error: any) => {
        console.error('Failed to delete population:', error);
        // Handle error case
        this.toastr.error("not removed")
        this.dialogRef.close(false); // Indicate unsuccessful deletion to the parent component
      }
    );
  }

  closeDialog(): void {
    this.toastr.error("not removed")
    this.dialogRef.close(false); // Indicate cancellation to the parent component
  }
}
