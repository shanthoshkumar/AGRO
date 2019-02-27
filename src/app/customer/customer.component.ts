import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder ,Validators } from '@angular/forms';
import { ChainServiceService } from '../service/chain-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import swal from 'sweetalert'
import * as Web3 from 'web3';
declare let window: any

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  public customer_details=[];
  public available_crop_details=[];
  public consumer_name;
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
          // price:['',Validators.required],
          supid:['',Validators.required]
          //  Updaters:['',Validators.required]
        });
    }


  Customer_purchase_product(product_id,product_quantity,shop_id) {
    if(product_id.trim()!=''&&product_quantity.trim()!='' &&product_quantity>0 &&shop_id.trim()!='') {
      this.spinner.show();
      this.cs.getAccount().then(address=>{
        this.cs.product_detail_map_shop(product_id,shop_id).then(p_d_m => {
          this.cs.consumer_buy_product(parseInt(product_id),parseInt(product_quantity),parseInt(shop_id),address,(p_d_m[0]/1000000000000000000)*product_quantity).then(res => {
            (document.getElementById("id1") as HTMLInputElement).value = "";
            (document.getElementById("id2") as HTMLInputElement).value = "";
            (document.getElementById("id3") as HTMLInputElement).value = "";
        
            this.spinner.hide();
            if(res == 1) {
              swal("You Bought Crop Successfully")
              this.consumers_crops();
              this.available_crops();
            }
            else if(res == 0) {
              swal("You Rejected this Transaction")
            }
            else if(res == 2) {
              swal("Transaction Failed")
            }
          })
        })
      })
    }
    else{
      swal("Fill all details correctly")
    }
  }
  


  available_crops() {
    this.available_crop_details.length=0;
    this.cs.getAccount().then(address=>{
      this.cs.shop_ids().then(ids=>{
        this.cs.product_ids().then(pids=>{
          ids.forEach(shop_id=>{
            pids.forEach(pid=>{
              this.cs.product_detail_map_shop(pid,shop_id).then(result=>{
                this.cs.shop_name(shop_id).then(shop_name=>{
                  this.cs.product_detail_map(pid).then(pro_d => {
                    if(result[1]!=0){
                        let obj={};
                        obj['product_name']=pro_d[0];
                        obj['shopid']=shop_id;
                        obj['shopname']=shop_name;
                        obj['productid']=pid;
                        obj['price']=result[0]/1000000000000000000;
                        obj['quantity']=result[1];
                        // obj['sellerid']=result[2];
                        this.available_crop_details.push(obj); 
                      }
                    })
                  })
                })
              })
          });
        })
      })
    })
  }
  
  consumers_crops() {
    this.customer_details.length=0;

    this.cs.getAccount().then(address=> {
      this.cs.consumer_id_by_address(address).then(cus_id => {
          this.cs.order_id(cus_id).then(order_ids => {
            order_ids.forEach(order_id=>{
              this.cs.consumer_map(cus_id,order_id).then(res => {
                this.cs.product_detail_map(res[0]).then(pro_d => {
                let obj = {};
                obj['product_name']=pro_d[0];
                obj['product_id']=res[0];
                obj['quantity']=res[1];
                obj['shop_id']=res[2];
                this.customer_details.push(obj); 
              })
            })
          })
        })
      })
    })
  }

  set_customer_name() {
    this.cs.getAccount().then(address => {
      this.cs.consumer_id_by_address(address).then(consumer_id => {
        this.cs.consumer_name(consumer_id).then(consumer_name => {
          this.consumer_name = consumer_name;
        })
      })
    })
  }
  
  ngOnInit() {
    this.available_crops()
    this.consumers_crops()
    this.set_customer_name()
  }

}
