import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {Employees} from "../interfaces/employees";
import {TokenService} from "../services/token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
form: Employees = {
  email: '',
  password:''
}

  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService,
     private tokenservice: TokenService,        private http:HttpClient,private router: Router) {
    sessionStorage.clear();

  }

  ngOnInit(): void {
    }
  onSubmit(): void {
    console.log(this.form);

    if (!this.form.email || !this.form.password) {
      this.toastr.error('Please provide both email and password.', 'Error');
      return;
    }

    this.service.login(this.form).subscribe(
      data => {
        console.log(data.token);
        this.tokenservice.saveToken(data.token);
        this.toastr.success('Login successful!', 'Success');
      },
      err => {
        console.log(err);
        this.toastr.error('Invalid email or password.', 'Error');
      }
    );
  }



}
