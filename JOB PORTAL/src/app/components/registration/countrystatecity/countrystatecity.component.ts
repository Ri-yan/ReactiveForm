import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CountrystatecityService } from 'src/app/services/countrystatecity.service';

@Component({
  selector: 'app-countrystatecity',
  templateUrl: './countrystatecity.component.html',
  styleUrls: ['./countrystatecity.component.css']
})
export class CountrystatecityComponent implements OnInit{
  form!:FormGroup
  countryList:any=[];
  stateList:any=[];
  cityList:any=[];
  registrationForm: any;
  countryName!:string;
constructor(private formservice:CountrystatecityService,private rootFormGroup:FormGroupDirective,private route: ActivatedRoute){}
getCountryList(){
  this.formservice.getCountry().subscribe((data)=>{
    this.countryList=data;
  })
  this.getState()
}
getState(){
  this.formservice.getState(this.form.controls["country"].value).subscribe((data)=>{
    this.stateList=data;
  })
  this.getCity()
}
getCity(){
  this.formservice.getCity(this.form.controls["state"].value).subscribe((data)=>{
    if(data.length==0){
      this.cityList=[{city_name:'No City Found'}]
    }
    else{
      this.cityList=data;
    }
  })
}
userID:any=null;
@Input() formGroupName!:string
  ngOnInit() {
    this.userID = this.route.snapshot.paramMap.get('id')
    if(this.userID!==null){

    }
    this.form=this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    this.getCountryList();
  }
}
