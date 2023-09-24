import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Populations} from "../../interfaces/populations";
import {Collaborators} from "../../interfaces/Collaborators";
import {CollaboratorsAdd} from "../../interfaces/CollaboratorsAdd";

@Component({
  selector: 'app-details-collaborator',
  templateUrl: './details-collaborator.component.html',
  styleUrls: ['./details-collaborator.component.css']
})
export class DetailsCollaboratorComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DetailsCollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { collabId: number },
    private http: HttpClient,
    private toastr: ToastrService,

  ) {}



  collab!: CollaboratorsAdd


  ngOnInit(): void {
    const url = `http://localhost:8282/collaborators/${this.data.collabId}`;
    this.http.get<CollaboratorsAdd>(url).subscribe(
      (response: CollaboratorsAdd) => {
        this.collab = response;
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
