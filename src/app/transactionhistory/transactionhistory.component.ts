import { Component, OnInit } from '@angular/core';
import { ChainServiceService } from '../service/chain-service.service';
@Component({
  selector: 'app-transactionhistory',
  templateUrl: './transactionhistory.component.html',
  styleUrls: ['./transactionhistory.component.css']
})
export class TransactionhistoryComponent implements OnInit {
public product_event;
public supplier_event;
public distributor_event;
public retailer_event;
public obj = {};
  constructor(private cs:ChainServiceService) { 
      
   }

  // event_reading() {
  //   this.cs.add_product_event().then(res1 =>{
  //     this.product_event=res1;
  //     this.cs.Supplier_event().then(res2 =>{
  //       this.supplier_event=res2;
  //       this.cs.Distributor_event().then(res3 =>{
  //         this.distributor_event=res3;
  //         this.cs.Retailer_event().then(res4 =>{
  //           console.log(res1[0]["args"]["farmer_adddress"]);
            
  //           this.retailer_event=res4;
  //         });
  //       });
  //     });
  //   });
  // }

  ngOnInit() {
  //  this.event_reading();  
  }

}
