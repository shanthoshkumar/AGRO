import { Component, OnInit } from '@angular/core';
import { ChainServiceService } from '../service/chain-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import swal from 'sweetalert'
import { Router } from '@angular/router';
import * as Web3 from 'web3';
declare let window: any
import { FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-shop-reg',
  templateUrl: './shop-reg.component.html',
  styleUrls: ['./shop-reg.component.css']
})
export class ShopRegComponent implements OnInit {
  public account;
  public id1;
  public _web3:any;
  angForm:FormGroup;

  constructor(private cs:ChainServiceService,private router:Router,private spinner:NgxSpinnerService,private route:Router,private fb:FormBuilder) { 
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
public name;

  shop_registeration(name)
  {
    if(name.trim()=='' || !isNaN(name.trim())) {
      swal("Please Enter Name Correctly!");
      (document.getElementById("id1") as HTMLInputElement).value = "";
      return;
    }
    else{
      this.spinner.show();
      this.cs.getAccount().then(address=>{
        this.cs.shop_registeration(name,address).then(res =>{ 
          this.spinner.hide();
          if(res == 1) {
            (document.getElementById("id1") as HTMLInputElement).value = "";
            swal("Successfully Registered...!");
            this.route.navigate(["Shop"]);
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
