import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private nickname: string;
  private password: string;

  constructor(private service: LoginService) { }

  ngOnInit() {
  }

  onClick() {
    console.log(this.nickname + " " + this.password)
    this.service.login(this.nickname,this.password);
  }

}
