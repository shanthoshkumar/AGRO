import { Component, OnInit } from '@angular/core';
import { ChainServiceService } from '../service/chain-service.service';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public address:string;
  public balance:number;
  public id;
  public private_key;

  constructor(private cs:ChainServiceService,private cook:CookieService,private route:Router) {
    this.fetch_balance();
  }
  
  sign_out(){
    // console.log("in");
    
    this.cook.delete("privateKey");
    // swal("Thank you ! come again!!");
  }

  fetch_balance(){
    this.cs.getAccount().then(add => {
      this.address=add;
      this.cs.getUserBalance(add).then(balance => {
        this.balance = balance;
      });
    })
  }

  ngOnInit() {
    let meta = this;
    meta.cs.get_cookie().then(priv_key => {
      meta.private_key = priv_key;
      meta.id = setInterval(function(){
        meta.fetch_balance();
        meta.cs.get_cookie().then(private_key => {
          if(meta.private_key!=private_key){
            meta.cs.delete_cookie().then(result =>{
              if(result==true){
                meta.route.navigate(['login'])
              }
            })
          }
        })
      },200);
    })
     
  }
  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
  // ngOnInit() {
  //   this.farmer_crop_table();
  //    this.set_farmer_name();
  //    let meta = this;
  //    meta.cs.getAccount().then(acc => {
  //        this.account = acc;
  //        meta.id1 = setInterval(function() {
  //        if (typeof window.web3 !== 'undefined') {
  //            meta._web3 = new Web3(window.web3.currentProvider);
  //            if (meta._web3.eth.accounts[0] !== meta.account) {
  //                meta.account = meta._web3.eth.accounts[0];
  //                if (meta._web3.eth.accounts[0] === undefined) {
  //                     meta.router.navigate(['metamask']);
  //                    clearInterval(this.interval);
  //                } else {
  //                    window.location.reload(true);             
  //                          }
  //            }
  //        } else {
  //             meta.router.navigate(['metamask']);
  //        }
  //        }, 200);
  //          });
  //  }
   

  }