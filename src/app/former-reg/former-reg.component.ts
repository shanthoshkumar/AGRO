import { Component, OnInit } from '@angular/core';
import { ChainServiceService } from '../service/chain-service.service';
import { FormGroup, FormBuilder ,Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import swal from 'sweetalert';
import * as Web3 from 'web3';
import { isString } from 'util';
declare let window: any;


@Component({
  selector: 'app-former-reg',
  templateUrl: './former-reg.component.html',
  styleUrls: ['./former-reg.component.css']
})
export class FormerRegComponent implements OnInit {
  public id1;
  public account:string;
  public _web3: any;
  angForm:FormGroup;


  constructor(private cs:ChainServiceService,private router:Router,private spinner:NgxSpinnerService,private fb:FormBuilder) { 
    this.createForm();
  }
  createForm() 
  {
     this.angForm = this.fb.group({
       fname: ['', Validators.required ],
      //  pprice: ['', Validators.required ],
      //  qty:['',Validators.required]
       // Updaters:['',Validators.required]
     });
  }
 
  farmer_registeration(name)
  {
    // console.log(isNaN(name));
    
    if(name.trim()=='' || !isNaN(name.trim())) {
      swal("Please Enter Name Correctly!");
      (document.getElementById("id1") as HTMLInputElement).value = "";
      return;
    }
    else{
      this.spinner.show();
      this.cs.getAccount().then(address=>{
        this.cs.farmer_registeration(name,address).then(res =>{
          this.spinner.hide();
          
          if(res == 1) {
            (document.getElementById("id1") as HTMLInputElement).value = "";
            swal("Successfully Registered...!");
            this.router.navigate(["Former"]);
          }
          else if( res == 0){
            (document.getElementById("id1") as HTMLInputElement).value = "";
            swal("You Rejected this transaction...!");
          }
          else if(res == 2){
            (document.getElementById("id1") as HTMLInputElement).value = "";
            swal("Transaction Failed...!");
          }
    
        })
      })
    }
  }
  ngOnInit() {
  }

}
