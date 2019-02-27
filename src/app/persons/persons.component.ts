import { Component, OnInit } from '@angular/core';
import { ChainServiceService } from "../service/chain-service.service";

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {
  public farmer_names = [];
  public supplier_names = [];
  public shop_names = [];
  public consumer_names = [];
  public product_details = [];

  constructor(private cs:ChainServiceService) { }

  available_farmers_table(){
    this.farmer_names.length = 0;
    this.cs.farmer_ids().then(farmer_ids => {
      farmer_ids.forEach(farmer_id => {
        this.cs.farmer_name(farmer_id).then(farmer_name => {
          let obj ={};
          obj['farmerid'] = farmer_id;
          obj['farmername'] = farmer_name;
          this.farmer_names.push(obj);
        })
      })
    })
  }
  available_suppliers_table(){
    this.supplier_names.length = 0;
    this.cs.supplier_ids().then(supplier_ids => {
      supplier_ids.forEach(supplier_id => {
        this.cs.supplier_name(supplier_id).then(supplier_name => {
          let obj ={};
          obj['supplierid'] = supplier_id;
          obj['suppliername'] = supplier_name;
          this.supplier_names.push(obj);
        })
      })
    })
  }
  available_shop_table(){
    this.shop_names.length = 0;
    this.cs.shop_ids().then(shop_ids => {
      shop_ids.forEach(shop_id => {
        this.cs.shop_name(shop_id).then(shop_name => {
          let obj ={};
          obj['shopid'] = shop_id;
          obj['shopname'] = shop_name;
          this.shop_names.push(obj);
        })
      })
    })
  }

  available_customer_table(){
    this.consumer_names.length = 0;
    this.cs.consumer_ids().then(customer_ids => {
      customer_ids.forEach(customer_id => {
        this.cs.consumer_name(customer_id).then(customer_name => {
          let obj ={};
          obj['customerid'] = customer_id;
          obj['customername'] = customer_name;
          this.consumer_names.push(obj);
        })
      })
    })
  }

available_product_details(){
  console.log("in");
  
  this.product_details.length = 0;
 this.cs.product_ids().then(productid =>{
   productid.forEach(productids => {
     this.cs.product_detail_map(productids).then(res =>{
      this.cs.farmer_name(res[3]).then(farmername =>{
       if(res[2]!=0){
        let obj = {};
        obj['productid'] = productids;
        obj['productname'] = res[0];
        obj['productprice'] = res[1]/1000000000000000000;
        obj['productquantity'] = res[2];
        obj['farmerid'] = res[3];
        obj['farmername'] = farmername;
        var tm = new Date(res[4]*1000);
        var time= tm.toString();
        obj['date'] = time;
        this.product_details.push(obj);
       }
    
     })
    })
   })

 })
}

  ngOnInit() {
    this.available_farmers_table();
    this.available_suppliers_table();
    this.available_shop_table();
    this.available_customer_table();
    this.available_product_details();
  }

}
