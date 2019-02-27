import { Component, OnInit } from '@angular/core';
import { ChainServiceService } from '../service/chain-service.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  public dashboard=[];
  public Total_products;
  public suppliers_list=[];
  public shops_list=[];
  public consumers_list=[];
  public product_details=[];
  constructor(private cs:ChainServiceService) {
    cs.product_ids().then(result =>this.Total_products=result.length)
   }

display(text_id)
{
  this.suppliers_list.length=0;
  this.shops_list.length=0;
  this.consumers_list.length=0;
this.cs.supplier_ids().then(s_ids=>{
  s_ids.forEach(id=>{
this.cs.product_detail_map_supplier(text_id,id).then(result=>{
  if(result[1]!=0)
  {
    this.cs.farmer_name(result[2]).then(farmer_name=>{
    this.cs.supplier_by_id(id).then(address=>{
      this.cs.supplier_name(id).then(name=>{
        let obj1={};
        obj1['supplier_id']=id;
        obj1['supplier_name']=name;
        obj1['supplier_address']=address;
        obj1['crop_price']=result[0]/1000000000000000000;
        obj1['crop_quantity']=result[1];
        obj1['seller_id']=result[2];
        obj1['seller_name']=farmer_name;;
        this.suppliers_list.push(obj1)
      })
    })
  })
  }
  else{
    // alert('NO Holders')
  }
})
})
})

this.cs.shop_ids().then(shp_ids=>{
  shp_ids.forEach(id => {
    this.cs.product_detail_map_shop(text_id,id).then(result=>{
      if(result[1]!=0)
      {
        this.cs.supplier_name(result[2]).then(supplier_name=>{
        this.cs.shop_by_id(id).then(address=>{
          this.cs.shop_name(id).then(name=>{
            let obj2={};
            obj2['shop_id']=id;
            obj2['shop_name']=name;
            obj2['shop_address']=address;
            obj2['crop_price']=result[0]/1000000000000000000;
            obj2['crop_quantity']=result[1];
            obj2['seller_id']=result[2];
            obj2['seller_name']=supplier_name;
            this.shops_list.push(obj2)
           })
        })
      })
      }
    })
    
  });
})


this.cs.consumer_ids().then(cons_ids=>{
  cons_ids.forEach(id=>{
    this.cs.order_id(id).then(order_ids=>{
      order_ids.forEach(or_id=>{
    this.cs.consumer_map(id,or_id).then(result=>{
      if(result[0]==text_id){
      this.cs.shop_name(result[2]).then(shop_name=>{
              this.cs.consumer_by_id(id).then(address=>{
      this.cs.consumer_name(id).then(name=>{
        let obj3={};
        obj3['consumer_id']=id;
        obj3['consumer_name']=name;
        obj3['consumer_address']=address;
        obj3['crop_price']=result[3]/1000000000000000000;
        obj3['crop_quantity']=result[1];
        obj3['shop_id']=result[2];
        obj3['shop_name']=shop_name;
        //  alert(name+''+address+''+result[0]+''+result[1]+''+result[2])
         console.log(obj3);
         
         this.consumers_list.push(obj3)
      })
    })
  })
}
    })
      })})
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
       
    
     })
    })
   })

 })
}

  ngOnInit() {
    this.available_product_details();
  }

}
