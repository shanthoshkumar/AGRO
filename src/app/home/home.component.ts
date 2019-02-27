import { Component, OnInit } from '@angular/core';
import { ChainServiceService } from '../service/chain-service.service';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public address:string;
  public balance:number;
  public private_key;
  public id;
  constructor(private cs:ChainServiceService,private cook:CookieService,private route:Router) { 
    this.cs.getAccount().then(add => {
      this.address=add;
      this.cs.getUserBalance(add).then(balance => {
        this.balance = balance;
      });
    })
  }
  sign_out(){
    // console.log("in");
    
    this.cook.delete("privateKey");
    // swal("Thank you ! come again!!");
  }

  ngOnInit() {
    let meta = this;
    meta.cs.get_cookie().then(priv_key => {
      meta.private_key = priv_key;
      meta.id = setInterval(function(){
        meta.cs.get_cookie().then(private_key => {
          if(meta.private_key!=private_key || private_key.length != 64){
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

}