import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  data: any;
  showtable: boolean;
  popup: boolean;
  username: any;
  password: any;
  e_id: any;
  showmodal: boolean;
  data1: any = {};
  list: any = [];
  spinner: boolean;

  constructor(private httpService: HttpClient, public router: Router, public _apiService: ApiService) { }

  ngOnInit() {
    this.getlist();

  }


  getlist() {
    this.spinner=true;
    this._apiService.getcallsetup().subscribe(data => {
      console.log(data, 'data present in users table');
      this.list = data.data;
    });
  }


  addData() {
    this.popup = true;
    const data = {
      username: this.username,
      password: this.password
    }
    this._apiService.insert(data).subscribe(data => {
      if (data.success == true) {
        console.log(data.data);
        this.data = data.data;
        this.getlist();
      }
      else {
        alert('data already exists');
      }
    });
    this.username = '';
    this.password = '';
  }
  editData(item: any) {
    this.popup = false;
    console.log(item);
    this.username = item.username;
    this.password = item.password;
    this.e_id = item.id
  }


  editData1() {
    const data = {
      username: this.username,
      password: this.password,
      id: this.e_id,
    }
    this._apiService.updateData(data).subscribe(data => {
      this.data = data.data;
      this.getlist();
    });
  }

  deleteData1(item) {
    console.log(item);
    this.username = item.username;
    this.password = item.password;
    this.e_id = item.id;
    const data = {
      id: this.e_id,
    }
    console.log(data, 'deleted row data');
    this._apiService.deletedata(data).subscribe(data => {
      console.log(data.data);
      this.getlist();
    });
  }


}
