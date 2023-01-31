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
  constructor(private service:RegistrationService,private formservice:CountrystatecityService){}
  formData:any={};
  countryList:any=[];
  stateList:any=[];
  cityList:any=[];
  registeredUserData:any=[]

  maxDate:any;

  futureDate(){
    var date:any = new Date();
    var todayDate:any = date.getDate();
    var month: any = date.getMonth() + 1;
    var year:any= date.getFullYear();
    if(todayDate <0)
    todayDate = '0' + todayDate;
    if(month <10)
    month ='0'+month
    this.maxDate = year+'-'+month+'-'+todayDate;
  }

  dropdownList:any=[];
  selectedItems:any;
  dropdownSettings={}
  getCountryList(){
    this.formservice.getCountry().subscribe((data)=>{
      this.countryList=data;
    })
  }
  getState(){
    this.formservice.getState(this.registrationForm.get('location.country')?.value).subscribe((data)=>{
      this.stateList=data;
    })
  }
  getCity(){
    this.formservice.getCity(this.registrationForm.get('location.state')?.value).subscribe((data)=>{
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
    this.futureDate()
    let data:any = localStorage.getItem('regiteredUsers');
    this.registeredUserData= JSON.parse(data) || [];
      this.registrationForm = new FormGroup({
        "name": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
        "dob":new FormControl(null,[this.ageCheck.bind(this),Validators.required]),
        "email": new FormControl(null,[Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        "phone":new FormControl(null,[Validators.required,Validators.maxLength(10),Validators.pattern('[0-9]{10}$')]),
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
         "martialStatus":new FormControl('single'),
         "skills": new FormControl(null,[Validators.required])
      })

      this.getCountryList();

      this.formModal = new window.bootstrap.Modal(
        document.getElementById('agreeModal')
      )
      this.formservice.getData().subscribe(data=>{
        this.formData=data;
      })
      console.log("Data",this.registeredUserData)



      this.dropdownSettings = { 
          singleSelection: false, 
          text:"Select Skills",
          selectAllText:'Select All',
          unSelectAllText:'UnSelect All',
          enableSearchFilter: true,
          classes:"myclass custom-class"
        };  
    }
    // onItemSelect(item:any){
    //   console.log(item);
    //   console.log(this.selectedItems);
    // }
    // OnItemDeSelect(item:any){
    //     console.log(item);
    //     console.log(this.selectedItems);
    // }
    // onSelectAll(items: any){
    //     console.log(items);
    // }
    // onDeSelectAll(items: any){
    //     console.log(items);
    // }
    
    onRegister(){
      this.isLoading=true;
      console.log("Data",this.registrationForm)
      this.registeredUserData.push(this.registrationForm.value)
      localStorage.setItem("regiteredUsers",JSON.stringify(this.registeredUserData))
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
      // this.registrationForm.controls['agree'].setValue(true);
      this.formModal.hide()
      // console.log(this.registrationForm.get('agree')?.value)
    }
    addSkill(event: Event){
      const control = new FormControl((event.target as HTMLInputElement).value);
      (<FormArray>this.registrationForm.get('skills')).push(control)
    }






    
  //Validator T0 check age greater than 18
  ageCheck(control:FormControl):{[s:string]:boolean}|null{
    const getAge = (birthDate:Date) => Math.floor((new Date().getTime() - new Date(birthDate).getTime()) / 3.15576e+10)
    if(getAge(control.value)<18){
      return {'ageNotAllowed':true};
    }
    return null;
  }
}
