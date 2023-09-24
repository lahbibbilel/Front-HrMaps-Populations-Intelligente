import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from 'src/material.module';
import {HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {TokenInterceptorProvider} from "./intercept/token.interceptor";
import { DialogBodyComponent } from './userlist/dialog-body/dialog-body.component';

import { DialogBodyComponent as UserlistDialogBodyComponent } from './userlist/dialog-body/dialog-body.component';
import { DialogBodyComponent as DashboardDialogBodyComponent } from './dashboard-Admin/dialog-body/dialog-body.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import {MatMenuModule} from "@angular/material/menu";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatBadgeModule} from "@angular/material/badge";
import {MatToolbarModule} from "@angular/material/toolbar";
import { HeaderUserComponent } from './dashboard-Admin/header-user.component';
import { PopulationsComponent } from './dashboard-Admin/populations/populations.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { UpdatePopulationBodyComponent } from './dashboard-Admin/update-population-body/update-population-body.component';
import { DeletePopulationBodyComponent } from './dashboard-Admin/delete-population-body/delete-population-body.component';
import { ProfilAdminComponent } from './dashboard-Admin/profil-admin/profil-admin.component';
import { UpdateProfilComponent } from './dashboard-Admin/update-profil/update-profil.component';
import { UpdateCollabBodyComponent } from './userlist/update-collab-body/update-collab-body.component';
import { DeleteCollabBodyComponent } from './userlist/delete-collab-body/delete-collab-body.component';
import { GetpopulationNameBodyComponent } from './userlist/getpopulation-name-body/getpopulation-name-body.component';
import { ChartComponent } from './dashboard-Admin/chart/chart.component';
import { DetailsCollaboratorComponent } from './userlist/details-collaborator/details-collaborator.component';
import { DetailsComponent } from './dashboard-Admin/details/details.component';

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        LoginComponent,
        HomeComponent,
        DialogBodyComponent,
        HeaderUserComponent,
        PopulationsComponent,
      UserlistDialogBodyComponent,
      DashboardDialogBodyComponent,
      UpdatePopulationBodyComponent,
      DeletePopulationBodyComponent,
      ProfilAdminComponent,
      UpdateProfilComponent,
      UpdateCollabBodyComponent,
      DeleteCollabBodyComponent,
      GetpopulationNameBodyComponent,
      ChartComponent,
      DetailsCollaboratorComponent,
      DetailsComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    FormsModule,
    MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule
    , MatDialogModule, MatMenuModule, MatSidenavModule, MatListModule, MatBadgeModule, MatToolbarModule, MatProgressBarModule
  ],
    providers: [TokenInterceptorProvider],
    exports: [
        DialogBodyComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
