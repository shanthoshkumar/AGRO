import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { ChainServiceService } from '../service/chain-service.service';

@Injectable({
  providedIn: 'root'
})
export class LogincheckGuard implements CanActivate {
  
  constructor(private route:Router, private cs:ChainServiceService){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let meta=this;
    return this.cs.check_cookie().then(cookie_exist => {
      if(!cookie_exist)
      {
        return true;
      }
      else if(cookie_exist)
      {
        meta.cs.get_cookie().then(key =>{
          if(key.length != 64)
          {
            return true;
          }
          else{
            meta.cs.getAccount().then(account => {
              meta.cs.check_admin().then(admin => {
                if(admin == account){
                  meta.route.navigate(['home'])
                  return false;
                }
                else{
                  meta.route.navigate(['user'])
                  return false;
                }
              })
            })
          }
        })
      }
    })
  }

}
 // if(cookie_exist == false)
      //   return true;
      // else{
      //   this.cs.get_cookie().then(cookie =>{
      //     if(cookie.length != 64){
      //       console.log(cookie.length)
      //       return true;
      //     }
      //     else{
      //       console.log("in else")
      //       this.cs.check_admin().then(admin => {
      //         this.cs.getAccount().then(account => {
      //           if(admin == account){
      //             this.route.navigate(['home'])
      //             return false;
      //           }
      //           else{
      //             this.route.navigate(['user'])
      //             return false;
      //           }
      //         })
      //       })
      //     }
      //   })
      // }