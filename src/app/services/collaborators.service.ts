import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Collaborators} from "../interfaces/Collaborators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CollaboratorsService {

  private apiUrl = 'http://localhost:8282'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  insertCollaborator(collaborator: Collaborators): Observable<Collaborators> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Collaborators>(`${this.apiUrl}/collaborators`, collaborator, { headers });
  }
}
