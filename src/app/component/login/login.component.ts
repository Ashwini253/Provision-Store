import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { SHA256 } from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private router: Router,
    private apiService: DataService
  ) {}

  email: string = '';
  password: any = '';
  errorMessage: boolean = false;
  response: any;

  ngOnInit() {}

  public regisForm = this.builder.group({
    email: this.builder.control('', [
      Validators.required,
      Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    ]),
    password: this.builder.control('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z]).{8,}$/
      ),
    ]),
  });
  hashPassword(password: string): string {
    // Hash the password using SHA256
    const hashedPassword = SHA256(password).toString();
    return hashedPassword;
  }

  public onSubmit(argVal: any) {
    let cryPassword = this.hashPassword(argVal.password);
    this.apiService.login(argVal.email, cryPassword).subscribe((response) =>
         {
          if (response.status.code == 200) { 
            // sessionStorage.setItem('login', 'ok');
            // this.router.navigate(['appcomp']);
                this.router.navigate(['list']);
              } 
        },(error) => {
            this.errorMessage = true;
          }
      );
    }
  }

