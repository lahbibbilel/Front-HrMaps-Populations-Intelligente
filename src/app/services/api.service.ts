import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8282/collaborators'; // Replace with your API base URL

  constructor(private http: HttpClient) {}

  countCollaboratorsWithPopulationName(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/collaborators/count/all-with-population-name`);
  }

  countCollaboratorsWithoutPopulationName(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/collaborators/count/all-withaout-population-name`);
  }
  countMostCommonPopulationName(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/collaborators/most-common-population`);
  }


}
