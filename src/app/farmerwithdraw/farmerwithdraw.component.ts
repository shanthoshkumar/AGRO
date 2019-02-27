import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder ,Validators } from '@angular/forms';
import { ChainServiceService } from '../service/chain-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import swal from 'sweetalert'


@Component({
  selector: 'app-farmerwithdraw',
  templateUrl: './farmerwithdraw.component.html',
  styleUrls: ['./farmerwithdraw.component.css']
})
export class FarmerwithdrawComponent implements OnInit {
  public  farmer_bal;
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

  farmer_balance(){
    this.farmer_bal = 0;
    this.cs.getAccount().then(address => {
      this.cs.farmer_id_by_address(address).then(farmer_id => {
        this.cs.farmer_balance(farmer_id).then(res => {
          this.farmer_bal = res/1000000000000000000;
        })
      })
    })
  }
  
  withdraw_func(withdrawamt){
    
    if(withdrawamt.trim()=='' || isNaN(withdrawamt.trim())){
      swal("Please Enter a Valid amount...!");
      (document.getElementById("id1") as HTMLInputElement).value = "";
      return;
    }
    
    else{
      this.spinner.show();
      this.cs.getAccount().then(address => {
        this.cs.farmer_id_by_address(address).then(farmer_id => {
          this.cs.farmer_balance(farmer_id).then(res => {
            this.farmer_bal = res/1000000000000000000;
            if( this.farmer_bal>=withdrawamt){
              this.cs.former_withdraw(withdrawamt*1000000000000000000,address).then(res => {
                (document.getElementById("id1") as HTMLInputElement).value = "";
                this.spinner.hide();
                if(res == 1) {
                  swal(" Amount Successfully Added to your Account")
                  this.farmer_balance();
                }
                else if(res == 0) {
                  swal("You Rejected this Transaction")
                }
                else if(res == 2){
                  swal("Transaction Failed")
                }
              })
            }
            else{
              this.spinner.hide();
              swal("You Can Withdraw Upto" + this.farmer_bal);
              (document.getElementById("id1") as HTMLInputElement).value = "";
            }
          })
        })
      })
    }
  }
  
  ngOnInit() {
    this.farmer_balance();
  }

}
