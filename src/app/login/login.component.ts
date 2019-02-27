import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import Web3 from 'web3';
import { ChainServiceService } from "../service/chain-service.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // public web3;
  public canshow:boolean;
  public account;
  constructor(private cs:ChainServiceService,private route:Router) { 
    
    
  }  



  fetch_account(private_key)
  {   
    if(private_key.length == 64)
    {
      this.cs.set_cookie(private_key).then(is_exist => {
        if(is_exist){
          this.cs.getAccount().then(account => {
            this.account = account;
            this.canshow=true;
          })
        }
      });
    }
    else 
    {
      alert("Invalid Key")
    } 
  }

  validate()
  {
    if((document.getElementById('verify') as HTMLInputElement).checked != false )
    {
      this.cs.check_admin().then(admin => {
        if(this.account==admin)
          this.route.navigate(['home']);
        else
          this.route.navigate(['user'])
      })
    }
    else
    {
      alert('Please Verify your Account')
    }
  }




  ngOnInit() 
  { 
    
  }
  

}
