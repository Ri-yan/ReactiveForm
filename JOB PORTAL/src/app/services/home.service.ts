import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }
  usersData:any=[];
  getUserData() {
    let data:any = localStorage.getItem('regiteredUsers');
    this.usersData=JSON.parse(data)
    return this.usersData;
  }
}
