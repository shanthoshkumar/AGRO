import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder ,Validators } from '@angular/forms';
import { ChainServiceService } from '../service/chain-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import swal from 'sweetalert'
import { Router } from '@angular/router';
import * as Web3 from 'web3';
declare let window: any

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  constructor(private cs:ChainServiceService,private router:Router,private fb:FormBuilder,private spinner: NgxSpinnerService) {	this.createForm(); }
  angForm:FormGroup;
  public available_crops = [];
  public purchased_crops = [];
  // public crop_details = [];
  public supplier_bal;
  public supplier_name;
  public account;
  public id1;
  public _web3:any


  createForm() 
  {
     this.angForm = this.fb.group({
       pid: ['', Validators.required ],
       qty: ['', Validators.required ],
      
       price:['',Validators.required]
       // Updaters:['',Validators.required]
     });
  }

  buy_crop(product_id,product_quantity,new_price){
    if(product_id.trim()!= '' && product_quantity.trim()!='' && product_quantity >0 && new_price.trim()!= '' && new_price>0){
    // console.log(product_id,product_quantity,new_price);
    
    this.spinner.show();
    this.cs.getAccount().then(address =>{
      this.cs.product_detail_map(product_id).then(p_d =>{
        
        
        this.cs.supplier_buy_product(product_id,product_quantity,new_price*1000000000000000000,address,(p_d[1] *product_quantity)).then(res => {
          (document.getElementById("id1") as HTMLInputElement).value = "";
          (document.getElementById("id2") as HTMLInputElement).value = "";
          (document.getElementById("id3") as HTMLInputElement).value = "";

         
          this.spinner.hide();
          if(res == 1)
          {
            swal("You Bought Crop Successfully")
            this.available_crops_to_purchase();
            this.Purchased_crops_table();
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
  }else{
    swal("Fill all details correctly");
  }
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
  


  available_crops_to_purchase(){
    this.available_crops.length = 0;
    this.cs.product_ids().then(product_ids => {
      product_ids.forEach(product_id=>{
        this.cs.product_detail_map(product_id).then(p_d => {
          if(p_d[2] != 0)
          {
            
            let obj = {};
            obj['cropid'] = product_id;
            obj['cropname'] = p_d[0];
            var tm = new Date(p_d[4]*1000);
            var time= tm.toString();
            obj['date'] = time;
            obj['quantity'] = p_d[2];
            obj['price'] = p_d[1]/1000000000000000000;
            obj['farmerid'] = p_d[3];
            this.available_crops.push(obj);
          }
        })
      })
    })
  }
  set_supplier_name(){
    this.cs.getAccount().then(address => {
      this.cs.supplier_id_by_address(address).then(supplier_id => {
        this.cs.supplier_name(supplier_id).then(supplier_name => {
          this.supplier_name = supplier_name;
        })
      })
    })
      
  }


  Purchased_crops_table(){
    this.purchased_crops.length = 0;
    this.cs.getAccount().then(address =>{
      this.cs.supplier_id_by_address(address).then(supplier_id =>{
        this.cs.product_ids().then(product_ids=>{
          product_ids.forEach(product_id => {
            this.cs.product_detail_map_supplier(product_id,supplier_id).then(p_d_s => {
              this.cs.product_detail_map(product_id).then(p_d => {
                if(p_d_s[2] != 0){
                  let obj = {};
                  obj['cropid'] = product_id;
                  obj['cropname'] = p_d[0];
                  var tm = new Date(p_d[4]*1000);
                  var time= tm.toString();
                  obj['date'] = time;
                  obj['farmerid'] = p_d[3];
                  obj['price'] = p_d_s[0]/1000000000000000000;
                  obj['quantity'] = p_d_s[1];
                  
                  this.purchased_crops.push(obj);
                }
              })
            })
          })
        })
      })
    })
  }

  ngOnInit() {
    this.supplier_balance();
    this.available_crops_to_purchase();
    this.Purchased_crops_table();
    this. set_supplier_name()
  //   let meta = this;
  //   meta.cs.getAccount().then(acc => {
  //       this.account = acc;
  //       meta.id1 = setInterval(function() {
  //       if (typeof window.web3 !== 'undefined') {
  //           meta._web3 = new Web3(window.web3.currentProvider);
  //           if (meta._web3.eth.accounts[0] !== meta.account) {
  //               meta.account = meta._web3.eth.accounts[0];
  //               if (meta._web3.eth.accounts[0] === undefined) {
  //                    meta.router.navigate(['metamask']);
  //                   clearInterval(this.interval);
  //               } else {
  //                   window.location.reload(true);             
  //                         }
  //           }
  //       } else {
  //            meta.router.navigate(['metamask']);
  //       }
  //       }, 200);
  //         });
  // }
  // ngOnDestroy() {
  //   if (this.id1) {
  //     clearInterval(this.id1);
  //   }

  }
}