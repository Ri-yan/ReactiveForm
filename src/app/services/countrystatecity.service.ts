import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountrystatecityService {
  constructor(private http: HttpClient) { }
  auth_token:string = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJub25vazI4NzQ1QGJ5bWVyY3kuY29tIiwiYXBpX3Rva2VuIjoiS1JnNTdtYU10RkFtM1pvWGE1LU5iYjdlMU9Ud3BkRUxOX2dQMUxKcnIwQjFmZy1zQkp0aFZDTGNpWWNzNFVJS0FfcyJ9LCJleHAiOjE2NzUxNjA5MzV9.-MMc4dVKJkjIAUseX7m7uZuq3WKCxgc6uVpqUjL79Do"
  base_Url:string = "https://www.universal-tutorial.com/api/"
  getCountry() {
    let headers = new HttpHeaders;
    headers = headers.set("Authorization", this.auth_token,
    ).set("Accept", "application/json");
    return this.http.get<any[]>(this.base_Url+'countries/', {
      headers: headers
    })
  }
  getState(name?: string) {
    let headers = new HttpHeaders;
    headers = headers.set("Authorization", this.auth_token,
    ).set("Accept", "application/json");
    let State_URL = this.base_Url+"states/" + name;
    return this.http.get<any[]>(State_URL, {
      headers: headers
    })
  }
  getCity(name?: string) {
    let headers = new HttpHeaders;
    headers = headers.set("Authorization", this.auth_token,
    ).set("Accept", "application/json");
    let State_URL = this.base_Url+"cities/" + name;
    return this.http.get<any[]>(State_URL, {
      headers: headers
    })
  }
}
