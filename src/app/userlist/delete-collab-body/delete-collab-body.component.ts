import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-delete-collab-body',
  templateUrl: './delete-collab-body.component.html',
  styleUrls: ['./delete-collab-body.component.css']
})
export class DeleteCollabBodyComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteCollabBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public collabData: { id: number },
    private http: HttpClient,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }
  deleteCollab(): void {
    const url = `http://localhost:8282/collaborators/coll/${this.collabData.id}`;
    this.http.delete(url).subscribe(
      (response: any) => {
        console.log('Collaborateur deleted successfully:', response);
        this.toastr.success("remove with success");
        this.dialogRef.close(true); // Indicate successful deletion to the parent component
      },
      (error: any) => {
        console.error('Failed to delete collaborateur:', error);
        // Handle error case
        this.toastr.error("not removed");
        this.dialogRef.close(false); // Indicate unsuccessful deletion to the parent component
      }
    );
  }


  closeDialog(): void {
    this.toastr.error("not removed")
    this.dialogRef.close(false); // Indicate cancellation to the parent component
  }
}
