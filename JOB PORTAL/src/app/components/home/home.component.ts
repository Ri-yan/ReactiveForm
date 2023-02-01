import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  searchByName!:string;
  searchByEmail!:string;

  usersData:any=[];
  constructor(private homeservice:HomeService,private router :Router){}
  getUserData(){
    this.usersData=this.homeservice.getUserData()
    console.log("All Register Candidates",this.usersData)
  }
  findUserById(_id:string){
    return this.usersData.find((obj: { id: string; })=>obj.id==_id)
  }
  navigateWithState(path:string) {
    this.router.navigate(["/update","user",path],{state:this.findUserById(path)});
  }
  ngOnInit(){
    this.getUserData()
    // let data:any = localStorage.getItem('regiteredUsers');
    // this.usersData=JSON.parse(data)
    // console.log(this.usersData)
  }

}
