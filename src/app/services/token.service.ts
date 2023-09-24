import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router:Router) { }
  saveToken(token:string):void
  {
    localStorage.setItem('token',token)
    this.router.navigate(['/dashboard/user'])
  }

  isLogged():boolean
  {
    const token = localStorage.getItem('token')
    console.log(token)
    return !! token
  }

clearToken():void
{
  localStorage.removeItem('token')
  this.router.navigate(['login'])
}
//recuperer pour passer a l'interceptor
  getToken(): string | null{
    return localStorage.getItem('token')
  }

  clearTokenExpired():void {
    localStorage.removeItem('token')
    this.router.navigate(['login'])
  }

}
