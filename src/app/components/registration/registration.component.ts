import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CountrystatecityService } from 'src/app/services/countrystatecity.service';
import { RegistrationService } from 'src/app/services/registration.service';

declare var window:any;
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup ;
  isLoading=false;
  error:string = "";
  constructor(private service:RegistrationService,private location:CountrystatecityService){}
  techSkills=['Java','C#','Web Dev','Machine Learning','Data Science']
  genders=['male','female','others']
  qualifications=['doctorate','post graduate','under graduate','intermediate','highschool']
  countryList:any=[];
  stateList:any=[];
  cityList:any=[];

  getCountryList(){
    this.location.getCountry().subscribe((data)=>{
      this.countryList=data;
    })
  }
  getState(){
    this.location.getState(this.registrationForm.get('location.country')?.value).subscribe((data)=>{
      this.stateList=data;
    })
  }
  getCity(){
    this.location.getCity(this.registrationForm.get('location.state')?.value).subscribe((data)=>{
      if(data.length==0){
        this.cityList=[{city_name:'No City Found'}]
      }
      else{
        this.cityList=data;
      }
    })
  }
  formModal:any
  ngOnInit(){
      this.registrationForm = new FormGroup({
        "name": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z]+$')]),
        "dob":new FormControl(null,[Validators.required]),
        "email": new FormControl(null,[Validators.required,Validators.email]),
        "phone":new FormControl(null,[Validators.required,Validators.maxLength(10)]),
        "address":new FormControl(null),
        "location":new FormGroup({
          "country": new FormControl(null,[Validators.required]),
          "state": new FormControl(null,[Validators.required]),
          "city": new FormControl(null,[Validators.required]),
         }),
         "pincode":new FormControl(null,[Validators.required,Validators.pattern('[0-9]+$'),Validators.maxLength(6)]),
         "gender":new FormControl(null,[Validators.required]),
         "qualification":new FormControl(null,[Validators.required]),
         "agree":new FormControl(null,[Validators.required]),
         "skills":new FormArray([])
      })
      this.getCountryList();
      this.formModal = new window.bootstrap.Modal(
        document.getElementById('exampleModal')
      )
    }
    onRegister(){
      this.isLoading=true;
      console.log(this.registrationForm)
      setTimeout(()=>{
        this.isLoading=false;
      },3000)
    }
    closeError(value:any){
      this.registrationForm.get(value)
      console.log(this.registrationForm.get(value)?.value)
    }
    openModal(){
      this.formModal.show()
    }
    closeModal(){
      this.registrationForm.controls['agree'].setValue(null);
      this.formModal.hide()
    }
    agree(){
      this.registrationForm.controls['agree'].setValue(true);
      this.formModal.hide()
      console.log(this.registrationForm.get('agree')?.value)
    }
    addSkill(event: Event){
      const control = new FormControl((event.target as HTMLInputElement).value);
      (<FormArray>this.registrationForm.get('skills')).push(control)
    }
}
