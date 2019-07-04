import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

declare var $;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showmodal: boolean;
  data: any;
  data1: any = {};
  error: string[];
  constructor(private httpService: HttpClient, public router: Router, public _apiService: ApiService) {

  }
  autoFocus() {
    setTimeout(() => {
      if (!$('#username').val()) {
        $('#username').focus();
      }
    }, 100);
  }
  ngOnInit() {
  }
  model: any = {};
  // login() {
  //   this.showmodal = true;
  // }
  onSubmit() {
    this._apiService.addData({
      username: this.model.username.trim(),
      password: this.model.password.trim()
    }).subscribe(data => {
     if(data.dataCount==2){
      this.router.navigate(['/table']);
      console.log(data, 'response');
      this.data = data.data;    
      console.log(this.data);
      }
      else{
        this.router.navigate(['/login']);
        alert('please enter valid username and password');
      }
     } );
    this.showmodal = false;
    this.model.username = '';
    this.model.password = '';
  }
  cancel() {
    this.showmodal = false;
    this.model.username = '';
    this.model.password = '';
  }


}
