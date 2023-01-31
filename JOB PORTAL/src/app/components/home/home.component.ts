import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  usersData:any=[];

  // dropdownList:any=[];
  // selectedItems:any;
  // dropdownSettings={}
  // userForm!: FormGroup;

  ngOnInit(){
    // this.userForm = new FormGroup({
    //   skills: new FormControl(null,Validators.required)
    // });
    
    let data:any = localStorage.getItem('regiteredUsers');
    this.usersData=JSON.parse(data)
    console.log(this.usersData)



//     this.dropdownList = [
//       {"id":1,"itemName":"Java"},
//       {"id":2,"itemName":"C#"},
//       {"id":3,"itemName":"Html"},
//       {"id":4,"itemName":"React"},
//       {"id":5,"itemName":"Angular"},
//       {"id":6,"itemName":"Bootstrap"},
//       {"id":7,"itemName":"SQL"},
//       {"id":8,"itemName":"PostgresSQL"},
//       {"id":9,"itemName":".Net Core"},
//       {"id":10,"itemName":"Firebase"}
//     ];
// this.selectedItems = [
//   {"id":2,"itemName":"C#"},
//   {"id":3,"itemName":"Html"},
//     ];
// this.dropdownSettings = { 
//           singleSelection: false, 
//           text:"Select Skills",
//           selectAllText:'Select All',
//           unSelectAllText:'UnSelect All',
//           enableSearchFilter: true,
//           classes:"myclass custom-class"
//         };         
  }
//   onItemSelect(item:any){
//     console.log(item);
//     console.log(this.selectedItems);
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
}
