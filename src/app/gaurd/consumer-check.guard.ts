import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ChainServiceService } from '../service/chain-service.service';
import swal from 'sweetalert'


@Injectable({
  providedIn: 'root'
})
export class ConsumerCheckGuard implements CanActivate {
  public address;
  constructor(private cs:ChainServiceService,private route:Router){
    // this.cs.getAccount().then(address=>this.address=address)
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.cs.check_consumer().then(result => {
        if (result != 0)
        {
          return true;
        }
        else if(result == 0)
        {
          // swal('Retailer not registered')
          this.route.navigate(["addconsumer"]);
          return false;
        }
      })
  }
}
