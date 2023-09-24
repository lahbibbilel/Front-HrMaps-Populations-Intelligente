import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RegisterComponent} from "./register/register.component";
//import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {UserlistComponent} from "./userlist/userlist.component";
import {AuthGuard} from "./guard/auth.guard";
import {HeaderUserComponent} from "./dashboard-Admin/header-user.component";
import {PopulationsComponent} from "./dashboard-Admin/populations/populations.component";
import {ProfilAdminComponent} from "./dashboard-Admin/profil-admin/profil-admin.component";
import {ChartComponent} from "./dashboard-Admin/chart/chart.component";



const routes: Routes = [

  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:HeaderUserComponent,canActivate:[AuthGuard],children : [
      {path:'user',component:UserlistComponent,canActivate:[AuthGuard]},
      {path:'profil',component:ProfilAdminComponent,canActivate:[AuthGuard]},
      {path:'chart',component:ChartComponent,canActivate:[AuthGuard]},
      {component:PopulationsComponent,path:'home'}]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
