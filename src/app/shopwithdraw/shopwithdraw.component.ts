import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder ,Validators } from '@angular/forms';
import { ChainServiceService } from '../service/chain-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import swal from 'sweetalert'



@Component({
  selector: 'app-shopwithdraw',
  templateUrl: './shopwithdraw.component.html',
  styleUrls: ['./shopwithdraw.component.css']
})
export class ShopwithdrawComponent implements OnInit {

  public  shop_bal;
  angForm:FormGroup;

  constructor(private fb:FormBuilder,private cs:ChainServiceService,private spinner: NgxSpinnerService)
  {
    this.createForm();
  }
  createForm() 
  {
     this.angForm = this.fb.group({
       pprice: ['', Validators.required ]
  
     });
  }


  shop_balance(){
    this.shop_bal = 0;
    this.cs.getAccount().then(address => {
      this.cs.shop_id_by_address(address).then(shop_id => {
        this.cs.shop_balance(shop_id).then(res => {
          this.shop_bal = res/1000000000000000000;
        })
      })
    })
  }
  
  
  shop_widthdraw(amount_to_widthdraw){
    
    if(amount_to_widthdraw.trim()=='' || isNaN(amount_to_widthdraw.trim())){
      swal("Please Enter a Valid amount...!");
      (document.getElementById("id1") as HTMLInputElement).value = "";
      return;
    }
    
    else{
      
      this.spinner.show();
      this.cs.getAccount().then(address => {
        this.cs.shop_id_by_address(address).then(shop_id => {
          this.cs.shop_balance(shop_id).then(res => {
            this.shop_bal = res/1000000000000000000;
            if( this.shop_bal>=amount_to_widthdraw){
              this.cs.shop_widthdraw(amount_to_widthdraw*1000000000000000000,address).then(res =>{
              (document.getElementById("id1") as HTMLInputElement).value = "";
              this.spinner.hide();
              if(res == 1)
              {
                swal("Amount Successfully Added to your Account")
                this.shop_balance();
              }
              else if(res == 0)
              {
                swal("You Rejected this Transaction")
              }
              else if(res == 2){
                swal("Transaction Failed")
              }
            })
            }
            else{
              (document.getElementById("id1") as HTMLInputElement).value = "";
              swal("You Can Withdraw Upto"+ this.shop_bal);
              this.spinner.hide();
            }
          })
        })
      })
    }
  
  }

  ngOnInit() {

    this.shop_balance();
  }

}
