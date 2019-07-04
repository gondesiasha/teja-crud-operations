import { Component } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sample';
  showmodal: boolean;
  constructor (private httpService: HttpClient,public router:Router) { }
 
}
