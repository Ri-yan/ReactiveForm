import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CountrystatecityService } from 'src/app/services/countrystatecity.service';
import { Location } from '@angular/common';
import { HomeService } from 'src/app/services/home.service';

declare var window: any;
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  /**********************************Variables Declaration****************************** */
  formtypecheck:boolean=false;

  userID: any = null;
  registrationForm!: FormGroup;
  isLoading = false;
  error: string = "";
  upData!: any;
  formData: any = {};
  countryList: any = [];
  stateList: any = [];
  cityList: any = [];
  registeredUserData: any = []
  maxDate: any;
  dropdownList: any = [];
  selectedItems: any;
  dropdownSettings = {};
  formModal: any;


  /**************************************CONSTRUCTOR**************************************/
  constructor(private homeservice: HomeService, private formservice: CountrystatecityService,
    private location: Location, private route: ActivatedRoute) {
     //to get data to populate form
   this.upData = this.location.getState()
 }
  //to get maxdate to disable future date
  futureDate() {
    // new Date().toJSON().slice(0,10)
    var date: any = new Date();
    var todayDate: any = date.getDate();
    var month: any = date.getMonth() + 1;
    var year: any = date.getFullYear();
    if (todayDate < 10)
      todayDate = '0' + todayDate;
    if (month < 10)
      month = '0' + month
    return this.maxDate = year + '-' + month + '-' + todayDate;
  }

  //fuction to generate random id's
  createId() {
    let id = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  /********************************LIFE CYCLE HOOKS START*************************************** */
  ngOnInit() {
    //getting the user ID to be updated from url
    this.userID = this.route.snapshot.paramMap.get('id')
    
    //setting the all registered user data to a variable
    this.registeredUserData = this.homeservice.getUserData() || []

    /*************************FORM DECLARATION************************************************ */
    this.registrationForm = new FormGroup({
      "id": new FormControl(null),
      "name": new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
      "dob": new FormControl(null, [this.ageCheck.bind(this), Validators.required]),
      "email": new FormControl(null, [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      "phone": new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]{10}$')]),
      "address": new FormControl(null),
      "location": new FormGroup({
        "country": new FormControl(null, [Validators.required]),
        "state": new FormControl(null, [Validators.required]),
        "city": new FormControl(null, [Validators.required]),
      }),
      "pincode": new FormControl(null, [Validators.required, Validators.pattern('[0-9]+$'), Validators.maxLength(6)]),
      "gender": new FormControl(null, [Validators.required]),
      "qualification": new FormControl(null, [Validators.required]),
      "agree": new FormControl(false, [Validators.required]),
      "martialStatus": new FormControl('single', Validators.required),
      "skills": new FormControl(null, [Validators.required])
    })

    /*************************to populate the registration form**************************/
    if (this.userID !== null) {
      this.formtypecheck=true
      this.registrationForm.patchValue({
        "id": this.upData.id,
        "name": this.upData.name,
        "dob": this.upData.dob,
        "email": this.upData.email,
        "phone": this.upData.phone,
        "address": this.upData.address,
        "location": {
          "country": this.upData.location.country,
          "state": this.upData.location.state,
          "city": this.upData.location.city,
        },
        "pincode": this.upData.pincode,
        "gender": this.upData.gender,
        "qualification": this.upData.qualification,
        "martialStatus": this.upData.martialStatus,
        "skills": this.upData.skills
      });

    }

    //initialise the confirm modal
    this.formModal = new window.bootstrap.Modal(document.getElementById('agreeModal'))

    // data for form fields
    this.formservice.getData().subscribe(data => {
      this.formData = data;
    })

    //skill checked select settings
    this.dropdownSettings = {
      singleSelection: false,
      text: "Select Skills",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };

    console.log("Data", this.registeredUserData)

  }

  /********************************LIFE CYCLE HOOKS ENDS*************************************** */



  

  /***************************On Update Submit*********************************/
  //Delete old item and aad updated data
    findReplace(allData: any[], idUpdate: string, updatedData: any): any {
      allData = allData.filter(obj => obj.id !== idUpdate);
      allData.push(updatedData);
      console.log(allData)
      return allData;
    }
  onUpdateSubmit() {
    this.isLoading = true;
    const data = this.findReplace(this.registeredUserData, this.userID, this.registrationForm.value)
    localStorage.setItem("regiteredUsers", JSON.stringify(data))
    setTimeout(() => {
      this.isLoading = false;
      this.registrationForm.reset()
    }, 3000)
  }


  /***************************On Register Submit*******************************/
  onRegisterSubmit() {
    this.isLoading = true;
    this.registrationForm.controls['id'].setValue(this.createId())
    console.log("Data", this.registrationForm)
    this.registeredUserData.push(this.registrationForm.value)
    localStorage.setItem("regiteredUsers", JSON.stringify(this.registeredUserData))
    setTimeout(() => {
      this.isLoading = false;
      this.registrationForm.reset()
    }, 3000)
  }

/*****************************Model functions***************************/
  
  openModal() {
    this.formModal.show()
  }
  closeModal() {
    this.registrationForm.controls['agree'].setValue(null);
    this.formModal.hide()
  }
  agree() {
    this.formModal.hide()
  }

/**********************************************************************/

  //Validator T0 check age greater than 18
  ageCheck(control: FormControl): { [s: string]: boolean } | null {
    const getAge = (birthDate: Date) => Math.floor((new Date().getTime() - new Date(birthDate).getTime()) / 3.15576e+10)
    if (getAge(control.value) < 18) {
      return { 'ageNotAllowed': true };
    }
    return null;
  }
}
