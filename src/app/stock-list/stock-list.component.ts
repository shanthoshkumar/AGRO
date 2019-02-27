import { Component, OnInit } from '@angular/core';
import { ChainServiceService } from "../service/chain-service.service";

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  public suppliers=[];
  public cropdetails=[];

  constructor(private cs:ChainServiceService) { }

  list_of_suppliers() {
    this.suppliers.length=0;
    this.cs.supplier_ids().then(ids=>{
      ids.forEach(supplier_id=>{
        this.cs.supplier_name(supplier_id).then(supplier_name=>{
          this.cs.supplier_by_id(supplier_id).then(supplier_address =>{
            // alert(supplier_name+''+supplier_address)
            let obj={};
            obj['supplier_id']=supplier_id;
            obj['supplier_name']=supplier_name;
            obj['supplier_address']=supplier_address;
            this.suppliers.push(obj)
          })  
        })
      })
    })
  }

  crop_details(supplier_id){
    this.cropdetails.length=0;
    this.cs.product_ids().then(ids=>{
      ids.forEach(crop_id=>{
        this.cs.product_detail_map_supplier(crop_id,supplier_id).then(result=>{
          if(result[1]!=0) {
            let obj={};
            obj['crop_id']=crop_id;
            this.cs.product_detail_map(crop_id).then(res =>obj['crop_name']=res[0]);
            obj['crop_quantity']=result[1];
            obj['crop_price']=result[2];
            this.cropdetails=[];
            this.cropdetails.push(obj);
          }
          else {
        // alert('No crops')
          }
        })
      })
    })
  }

  ngOnInit() {
    this.list_of_suppliers()
  }

}