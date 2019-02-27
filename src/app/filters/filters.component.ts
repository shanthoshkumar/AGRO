import { Component, OnInit } from '@angular/core';
import { ChainServiceService } from '../service/chain-service.service';
import swal from 'sweetalert'


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  public available_crops=[]
  public avail_crops_ids=[]
  public buyerdetails=[];
  public persons_detail=[];
  public selected;
  public cropid;
    constructor(private cs:ChainServiceService) { }
    crop_ids(){
      this.cs.product_ids().then(product_ids=>{
        product_ids.forEach(p_ids => {
          let obj={}
          obj['crop_id']=p_ids;
          this.avail_crops_ids.push(obj);
        });
      })
    }
    
    sortlisting(option){
       if (parseInt(option) != 0) {
        this.cropid=parseInt(option);
        this.cropid_table(option);
      } else {
        this.cs.product_ids().then(product_ids=>{
          product_ids.forEach(p_ids => {
            this.cropid_table(p_ids);
          });
        });
      }
 
    }
    
    cropid_table(crop_id){
    this.cropid="";
        this.available_crops.length=0;
          this.cs.product_detail_map(crop_id).then(pro_res=>{
            this.cs.farmer_by_id(pro_res[3]).then(far_address=>{
    this.cs.farmer_name(pro_res[3]).then(farmer_name=>{
          let obj={};
          obj['cropid'] =crop_id;
          obj['cropname'] =pro_res[0] ;
          var tm = new Date(pro_res[4]*1000);
          var time= tm.toString();
          obj['date'] = time;
          obj['quantity'] = pro_res[2];
          obj['price'] = pro_res[1]/1000000000000000000;
          obj['farmerid'] = pro_res[3];
          obj['farmername'] = farmer_name;
          obj['farmeraddress'] = far_address;
          this.available_crops.push(obj);
          this.cropid=crop_id;
        })
       })    
      })
    }
    
    //show
show() {
  var x = document.getElementById("div2");
  var y = document.getElementById("div1");
      x.style.display = "block";
      y.style.display = "none";
}

//hide
hide() {
  var x = document.getElementById("div1");
  var y = document.getElementById("div2");
  y.style.display = "none";
      x.style.display = "block";
}
    
    persons_details_by_selected(selectedvalue){
      this.selected="";
      this.persons_detail.length=0;

      if(selectedvalue==1){
        this.selected=1;
      this.cs.farmer_ids().then(f_ids=>{
        f_ids.forEach(f_id => {
          this.cs.farmer_by_id(f_id).then(f_address=>{
              this.cs.product_detail_map(this.cropid).then(p_details=>{
                if(p_details[3]==f_id){
                  let obj_far={}
                  obj_far['address']=f_address;
                  this.persons_detail.push(obj_far)
                 
                }
        
            })
          
             
            })
          });
      })
    }
    
    else if(selectedvalue==2){
      this.selected=2;
        this.cs.supplier_ids().then(s_ids=>{
        s_ids.forEach(s_id => {
          this.cs.supplier_by_id(s_id).then(s_address=>{
            this.cs.product_detail_map(this.cropid).then(p_details=>{
              this.cs.product_detail_map_supplier(this.cropid,s_id).then(sup=>{
              //  if(p_details[3]==sup[2]) {
                let obj_sup={}
                obj_sup['address']=s_address;
                
                this.persons_detail.push(obj_sup)
             
              //  }
              })
            })
        
          })
        });
        })
      }
    
      else if(selectedvalue==3){
          this.cs.shop_ids().then(shop_ids=>{
          shop_ids.forEach(shop_id => {
            this.cs.shop_by_id(shop_id).then(shop_address=>{
          let obj_shop={}
          obj_shop['address']=shop_address;
          
          this.persons_detail.push(obj_shop)
          this.selected=3;
            })
          });
          })
        }
    
        else if(selectedvalue==4){
          this.selected=4;
          this.cs.consumer_ids().then(con_ids=>{
            con_ids.forEach(con_id => {
              this.cs.consumer_by_id(con_id).then(con_address=>{
                this.cs.order_id(con_id).then(or_ids=>{
                  or_ids.forEach(or_id => {                  
                    this.cs.consumer_map(con_id,or_id).then(retailer_details=>{
                      if(this.cropid==retailer_details[0]){
                        let obj_con={}
                        obj_con['address']=con_address;                        
                        this.persons_detail.push(obj_con)                        
                      }
                    })
                  })
                })
            
              })
            });
            })
          }
    }
    
    
    
    general(address){
  
      // alert("in Address function")
      if(this.selected==1){
        // alert("farmer")
        this.farmer_details(this.cropid,address);
        // this.cropid="";
      }
      else if(this.selected==2){
        // alert("supplier")
        this.supplier_details(this.cropid,address);
        // this.cropid="";
      }
      else if(this.selected==3){
        // alert("distri")
        this.Distributor_details(this.cropid,address);
        // this.cropid="";
      }
      else if(this.selected==4){
        // alert("retail")
        this.Retailer_details(this.cropid,address);
        // this.cropid="";
      }
      this.buyerdetails.length=0
    
    }
    
    farmer_details(p_id,farmer_address){
      if(p_id==undefined){
        swal("please select Cropid")
      }
    this.cs.farmer_id_by_address(farmer_address).then(farmer_id=>{
    this.cs.farmer_name(farmer_id).then(farmername=>{
    this.cs.product_detail_map(p_id).then(p_details=>{
      if(farmer_id==p_details[3]){
        // if(p_details[2]!=0){    
          let obj1={};  
        obj1['address']=farmer_address;
        obj1['id']=farmer_id;
        obj1['name']=farmername;
        obj1['cropid']=p_id;
        obj1['cropname']=p_details[0];    
        obj1['cropprice']=p_details[1]/1000000000000000000;
        if(p_details[2]!=0){
          obj1['cropquantity']=p_details[2];        
        }else{
          obj1['cropquantity']="Out of Stock";        
        }
        
        // obj1['cropdate']=p_details[4]; 
        this.buyerdetails.push(obj1);  
            //  }
            } 
            })
        })
        })
      }
    
      supplier_details(p_id,supplier_address){
        if(p_id==undefined){
          swal("please select Cropid")
        }
        this.cs.supplier_id_by_address(supplier_address).then(supplier_id=>{
          this.cs.supplier_name(supplier_id).then(suppliername=>{
            this.cs.product_detail_map(p_id).then(p_details=>{
            // this.cs.product_ids().then(pr_ids=>{
            //   pr_ids.forEach(p_id => {
          this.cs.product_detail_map_supplier(p_id,supplier_id).then(sup_details=>{
            let obj3={}; 
            obj3['address']=supplier_address;
              obj3['id']=supplier_id;
              obj3['name']=suppliername;
              obj3['cropid']=p_id;
              obj3['cropname']=p_details[0];
              obj3['cropprice']=sup_details[0]/1000000000000000000;   
            if(sup_details[1]!=0){                 
              // obj3['cropprice']=sup_details[0]/1000000000000000000;    
              obj3['cropquantity']=sup_details[1];                           
                    }
                    else{ 
                      // obj3['cropprice']="";    
                      obj3['cropquantity']="Out Of Stock";                                 
                    }
                    this.buyerdetails.push(obj3);        
                  })
                 });
                // })
              })
              })
            }
     
            Distributor_details(p_id,distributor_address){
              // console.log(p_id);
              console.log(distributor_address);
              
              
              if(p_id==undefined){
                swal("please select Cropid")
              }
              this.cs.shop_id_by_address(distributor_address).then(distributor_id=>{
                
                
                
                this.cs.shop_name(distributor_id).then(distributorname=>{
                  // console.log(distributorname);
                  
                  this.cs.product_detail_map(p_id).then(p_details=>{
                  // this.cs.product_ids().then(pr_ids=>{
                  //   pr_ids.forEach(p_id => {
                this.cs.product_detail_map_shop(p_id,distributor_id).then(shop_details=>{
                  let obj_shop={}; 
                  obj_shop['address']=distributor_address;
                  obj_shop['id']=distributor_id;
                  obj_shop['name']=distributorname;
                  obj_shop['cropid']=p_id;
                  obj_shop['cropname']=p_details[0];
                  // console.log(shop_details[0]);
                  
                  obj_shop['cropprice']=shop_details[0]/1000000000000000000; 
                  if(shop_details[1]!=0){        
                              obj_shop['cropquantity']=shop_details[1];                          
                          }
                          else{ 

                             obj_shop['cropquantity']="Out Of Stock";                       
                          }     
                          this.buyerdetails.push(obj_shop);     
                        })
                       });
                      // })
                    })
                    })
                  }
                  
                  Retailer_details(p_id,retailer_address){
                    if(p_id==undefined){
                      swal("please select Cropid")
                    }
                    this.cs.consumer_id_by_address(retailer_address).then(retailer_id=>{
                      console.log(p_id);
                      
                      this.cs.consumer_name(retailer_id).then(retailername=>{
                        this.cs.order_id(retailer_id).then(or_ids=>{
                          or_ids.forEach(or_id => {
                            this.cs.product_detail_map(p_id).then(p_details=>{
                            this.cs.consumer_map(retailer_id,or_id).then(retailer_details=>{
                              this.cs.product_detail_map_shop(p_id,retailer_details[2]).then(shop_price=>{
                                if(p_id==retailer_details[0]){
                                  let obj_con={}; 
                                  obj_con['address']=retailer_address;
                                  obj_con['id']=retailer_id;
                                  obj_con['name']=retailername;
                                  obj_con['cropid']=retailer_details[0];
                                  obj_con['cropname']=p_details[0];
                                  obj_con['cropprice']=retailer_details[3]/1000000000000000000;
                                  
                                  
                                  if(retailer_details[1]!=0){       
                                    // obj_con['cropprice']=retailer_details[0]/1000000000000000000;    
                                    obj_con['cropquantity']=retailer_details[1];                          
                                          }
                                          else{ 
                                            // obj_con['cropprice']="";    
                                            obj_con['cropquantity']="Out Of Stock";                       
                                          }     
                                          this.buyerdetails.push(obj_con);   
                                }                                                              
                                })
                              })
                             });
                            });
                            })
                          })
                          })
                        }
    
      ngOnInit() {
        this.crop_ids();
      }
    
    }
    