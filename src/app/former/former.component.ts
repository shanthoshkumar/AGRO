import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder ,Validators } from '@angular/forms';
import { ChainServiceService } from '../service/chain-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import swal from 'sweetalert'
import { Router } from '@angular/router';
import * as Web3 from 'web3';
declare let window: any

@Component({
  selector: 'app-former',
  templateUrl: './former.component.html',
  styleUrls: ['./former.component.css']
})
export class FormerComponent implements OnInit {
  public  farmer_bal;
  public farmer_name;
  angForm:FormGroup;
  public account;
  public id1;
  public _web3:any


  constructor(private cs:ChainServiceService,private router:Router,private fb:FormBuilder,private spinner: NgxSpinnerService) 
  { 
  	this.createForm();
  }
  createForm() 
   {
	    this.angForm = this.fb.group({
        cname: ['', Validators.required ],
        pprice: ['', Validators.required ],
        qty:['',Validators.required]
	      // Updaters:['',Validators.required]
	    });
   }

 public product_details=[];

 signout(){
   this.cs.delete_cookie().then(is_signed_out =>{
     if(is_signed_out == true){
       swal("Bye "+this.farmer_name+" !");
       this.router.navigate(['home']);
     }
     else{
       swal("Please Try again!")
     }
   });
 }
 
  farmer_add_product(product_name,product_price,product_quantity){
    // console.log(product_name,product_price,product_quantity);
    if(product_name.trim()!=''&&product_price.trim()!='' &&product_price>0  &&product_quantity.trim()!=''&&product_quantity>0 ){
    this.spinner.show();
    this.cs.getAccount().then(address => {
      this.cs.farmer_add_product(product_name,product_price,product_quantity,address).then(res => {
        (document.getElementById("id1") as HTMLInputElement).value = "";
        (document.getElementById("id2") as HTMLInputElement).value = "";
        (document.getElementById("id3") as HTMLInputElement).value = "";
        
        this.spinner.hide();
        if(res == 1)
        {
          this.farmer_crop_table();
         swal("Crop Added Successfully")
        }
        else if(res == 0)
        {
        swal("You Rejected this Transaction")
        }
        else if(res == 2){
          swal("Transaction Failed")
        }
      })
    })
  }else{
    swal("Fill all details correctly")
  }
} 
  farmer_crop_table(){
    this.product_details.length = 0;
    this.cs.getAccount().then(address => {
      this.cs.farmer_id_by_address(address).then(farmer_id => {
        this.cs.product_ids().then(produt_ids => {
          produt_ids.forEach(produt_id=>{
            this.cs.product_detail_map(produt_id).then(p_d => {
              if(p_d[3]==farmer_id)
              {
                let arr = {};
                arr['product_id'] = produt_id;
                arr['product_name']=p_d[0];
                arr['product_price']=p_d[1]/1000000000000000000;
                arr['product_quantity']=p_d[2];
                var tm = new Date(p_d[4]*1000);
                var time= tm.toString();
                arr['add_time']=time;
                this.product_details.push(arr);
              }
            })
          });
        })
      })
    })
  }

  set_farmer_name(){
    this.cs.getAccount().then(address => {
      this.cs.farmer_id_by_address(address).then(farmer_id => {
        this.cs.farmer_name(farmer_id).then(farmer_name => {
          this.farmer_name = farmer_name;
        })
      })
    })
  }

  ngOnInit() {
   this.farmer_crop_table();
    this.set_farmer_name();
  }
  
}
