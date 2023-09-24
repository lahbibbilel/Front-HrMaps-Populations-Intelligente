import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employees} from "../interfaces/employees";
import {Profil} from "../interfaces/profil";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
private apiUrl = "http://localhost:8282/employees"

  constructor(private http : HttpClient) { }



  getUsers() {
    return this.http.get(this.apiUrl);
  }
}
