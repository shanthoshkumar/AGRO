import { Component, OnInit } from '@angular/core';
import { ChainServiceService } from "../service/chain-service.service";

@Component({
  selector: 'app-consumer-crops',
  templateUrl: './consumer-crops.component.html',
  styleUrls: ['./consumer-crops.component.css']
})
export class ConsumerCropsComponent implements OnInit {

  constructor(private cs:ChainServiceService) { }

  public consumers=[];
  public cropdetails=[];

  list_of_consumer() {
    this.consumers.length=0;
    this.cs.consumer_ids().then(ids=>{
      ids.forEach(consumer_id=>{
        this.cs.consumer_name(consumer_id).then(consumer_name=>{
          this.cs.consumer_by_id(consumer_id).then(consumer_address =>{
            // alert(supplier_name+''+supplier_address)
            let obj={};
            obj['consumer_id']=consumer_id;
            obj['consumer_name']=consumer_name;
            obj['consumer_address']=consumer_address;
            this.consumers.push(obj)
          })  
        })
      })
    })
  }

  
  crop_details(consumer_id) {
    this.cropdetails.length=0;
    this.cs.order_id(consumer_id).then(order_ids=>{
      order_ids.forEach(or_id=>{
        this.cs.consumer_map(consumer_id,or_id).then(result=>{
          this.cs.product_detail_map(result[0]).then(res =>{
            let obj={};
            obj['crop_id']=result[0];
            obj['crop_name']=res[0]
            obj['crop_quantity']=result[1];
            this.cropdetails.push(obj);
            // obj['crop_price']=result[2];
          });
        });
      });
    });
  }





  
// this.cs.consumer_ids().then(cons_ids=>{
//   cons_ids.forEach(id=>{
//     this.cs.order_id(id).then(order_ids=>{
//       order_ids.forEach(or_id=>{
//     this.cs.consumer_map(id,or_id).then(result=>{
//       if(result[0]==text_id)
//       {
//       this.cs.shop_name(result[2]).then(shop_name=>{
//               this.cs.consumer_by_id(id).then(address=>{
//       this.cs.consumer_name(id).then(name=>{
//         let obj3={};
//         obj3['consumer_id']=id;
//         obj3['consumer_name']=name;
//         obj3['consumer_address']=address;
//         obj3['crop_price']=result[3];
//         obj3['crop_quantity']=result[1];
//         obj3['shop_id']=result[2];
//         obj3['shop_name']=shop_name;
//         //  alert(name+''+address+''+result[0]+''+result[1]+''+result[2])
//          console.log(obj3);
         
//          this.consumers_list.push(obj3)
//       })
//     })
//   })
//   }
//  })
// })
// })
// })
// })

  ngOnInit() {
    this.list_of_consumer()
  }

}
