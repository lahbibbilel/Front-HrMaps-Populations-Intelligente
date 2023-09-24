import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormControl, ɵElement, ɵValue} from "@angular/forms";
import {Employees} from "../interfaces/employees";
import {Observable} from "rxjs";
import {Emptoken} from "../interfaces/emptoken";
import {Profil} from "../interfaces/profil";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) {

  }
  apiurl='http://localhost:8282/api/v1/auth/authenticate';


  login(emp : Employees):Observable<Emptoken>
  {
    return this.http.post<Emptoken>(this.apiurl,emp)
  }


  RegisterUser(inputdata:any){
    return this.http.post(this.apiurl,inputdata)
  }


  GetUserbyCode(id:any){
    return this.http.get(this.apiurl+'/'+id);
  }

}
