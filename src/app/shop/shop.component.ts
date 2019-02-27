import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder ,Validators } from '@angular/forms';
import { ChainServiceService } from '../service/chain-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import swal from 'sweetalert'
import { Router } from '@angular/router';
import * as Web3 from 'web3';
declare let window: any

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {


public available_supplierproducts=[];
public shops_available_products=[];
public shop_bal;
public shop_name;
public account;
public id1;
public _web3:any

angForm:FormGroup;
  constructor(private fb:FormBuilder,private cs:ChainServiceService,private router:Router,private spinner: NgxSpinnerService) 
  { 
  	this.createForm();
  }  

  createForm() 
   {
	    this.angForm = this.fb.group({
	       pid: ['', Validators.required ],
	       qty: ['', Validators.required ],
         price:['',Validators.required],
         supid:['',Validators.required]
        //  Updaters:['',Validators.required]
	    });
   }

  buy(product_id,product_quantity,new_price,su_id) 
  {
    if(product_id.trim()!='' && product_quantity.trim()!= ''&& product_quantity>0 &&new_price.trim()!='' &&new_price>0 && su_id.trim()!= ''){
      this.spinner.show();
      this.cs.getAccount().then(address=>{
        this.cs.product_detail_map_supplier(product_id,su_id).then(result=>{
          console.log(result);
          
            this.cs.shop_buy_product(product_id,product_quantity,new_price,su_id,address,result[0]*product_quantity).then(res=>{
              (document.getElementById("id1") as HTMLInputElement).value = "";
              (document.getElementById("id2") as HTMLInputElement).value = "";
              (document.getElementById("id3") as HTMLInputElement).value = "";
              (document.getElementById("id4") as HTMLInputElement).value = "";
              this.spinner.hide();
              if(res == 1)
              {
                swal("You Bought Crop Successfully")
                this.shops_available_products.length=0;
                this.shop_product_details();
                this.available_supplier_products();
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
      })
    }
    else{
      swal("Fill all details correctly");
    }
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

set_shop_name(){
  this.cs.getAccount().then(address => {
    this.cs.shop_id_by_address(address).then(shop_id => {
      this.cs.shop_name(shop_id).then(shop_name => {
        this.shop_name = shop_name;
      })
    })
  })
    
}

shop_product_details(){
  this.shops_available_products.length = 0;
  this.cs.getAccount().then(shop_address=>{
    this.cs.shop_id_by_address(shop_address).then(shop_id => {
      this.cs.produt_ids().then( product_ids => {
        product_ids.forEach(p_id => {
        this.cs.product_detail_map_shop(p_id,shop_id).then(res => {
          this.cs.product_detail_map(p_id).then(pro_d => {
            if(res[2] != 0){
              let obj = {};
              obj['product_name']=pro_d[0];
              obj['product_id']=p_id;
              obj['product_price']=res[0]/1000000000000000000;
              obj['product_quantity']=res[1];
              obj['seller_id']=res[2];
              // obj['product_quantity']=res[3];
              this.shops_available_products.push(obj); 
             }         
           })
          })
        })
      })
    })
  })
}

available_supplier_products(){
  let meta = this;
  meta.available_supplierproducts.length = 0;
  meta.cs.supplier_ids().then(ids=>{
    meta.cs.product_ids().then(pids=>{
      ids.forEach(function (v1) {
        pids.forEach(function (v2) {
          meta.cs.supplier_name(v1).then(function(supplier_name){
            meta.cs.product_detail_map_supplier(v2,v1).then(function(result){
              if(result[1] != 0){
                meta.cs.product_detail_map(v2).then(function(v3){
                  let obj = {};
                  obj['supplierid']=v1;
                  obj['suppliername']=supplier_name;
                  obj['productid']=v2;
                  obj['productname']= v3[0];
                  obj['productquantity']=result[1];
                  obj['productprice']=result[0]/1000000000000000000;
                  meta.available_supplierproducts.push(obj)
                });
              }
            });
          });
        });  
      });
    });
  });
}
  ngOnInit() {
    this.shop_balance();
    this.shop_product_details()
    this.available_supplier_products();
    this.set_shop_name();
    
  }

}

