import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, switchMap, throwError} from "rxjs";
import {TokenService} from "./token.service";
import {Collaborators} from "../interfaces/Collaborators";
import {Populations} from "../interfaces/populations";
import {Employees} from "../interfaces/employees";
import {Emptoken} from "../interfaces/emptoken";

@Injectable({
  providedIn: 'root'
})
export class PopulationServiceService {

  private apiUrl = 'http://localhost:8282/populations';

  constructor(private http: HttpClient,private tokenService : TokenService) {}


 getPopulations () {
    return this.http.get('http://localhost:8282/populations')
  }

 AddPopulations(data: Populations) {
    return this.http.post<Populations>(`${this.apiUrl}`, data);
  }
}
