import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private email: string;
  private nickname: string;
  private password: string;
  private confirmPassword: string;
  private hasError: boolean;
  private hasSuccess: boolean;

  constructor(private service: RegistrationService, private router: Router) {

  }

  ngOnInit() {

  }

  onClick() {
    console.log(this.email + " " + this.password + " " + this.nickname + " " + this.confirmPassword)
    this.service.register(this.email, this.nickname, this.password, this.confirmPassword).subscribe(
      (data) => {
        this.hasError = false,
        this.hasSuccess = true
      }, // success path
      error => this.hasError = true
    );
  }

}
