import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder ,Validators } from '@angular/forms';
import { ChainServiceService } from '../service/chain-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import swal from 'sweetalert'

@Component({
  selector: 'app-supplierwithdraw',
  templateUrl: './supplierwithdraw.component.html',
  styleUrls: ['./supplierwithdraw.component.css']
})
export class SupplierwithdrawComponent implements OnInit {

  public  supplier_bal;
  angForm:FormGroup;

  constructor(private fb:FormBuilder,private cs:ChainServiceService,private spinner: NgxSpinnerService)
  {
    this.createForm();
  }
  createForm() 
  {
     this.angForm = this.fb.group({
      //  cname: ['', Validators.required ],
       pprice: ['', Validators.required ],
      //  qty:['',Validators.required]
       // Updaters:['',Validators.required]
     });
  }



  
  supplier_balance(){
    this.supplier_bal = 0;
    this.cs.getAccount().then(address => {
      this.cs.supplier_id_by_address(address).then(supplier_id => {
        this.cs.supplier_balance(supplier_id).then(res => {
          this.supplier_bal = res/1000000000000000000;
        })
      })
    })
  }
  
  supplier_withdraw_func(amount_to_widthdraw){
    
    if(amount_to_widthdraw.trim()=='' || isNaN(amount_to_widthdraw.trim())){
      swal("Please Enter a Valid amount...!");
      (document.getElementById("id1") as HTMLInputElement).value = "";
      return;
    }
    else{
      this.spinner.show();
      this.cs.getAccount().then(address=>{
        this.cs.supplier_id_by_address(address).then(supplier_id => {
          this.cs.supplier_balance(supplier_id).then(res => {
            this.supplier_bal = res/1000000000000000000;
            //alert(this.supplier_bal);

            if(this.supplier_bal >=amount_to_widthdraw){
              this.cs.supplier_widthdraw(amount_to_widthdraw*1000000000000000000,address).then(res =>{
                
                (document.getElementById("id1") as HTMLInputElement).value = "";
                this.spinner.hide();
                if(res == 1)
                {
                  swal("Amount Successfully Added to your Account")
                  this.supplier_balance();
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
              swal("You can withdraw upto"+this.supplier_bal);
              this.spinner.hide();
            }
          })
        })
      })
    }
  }



  ngOnInit() {

    this.supplier_balance();
  }

}

