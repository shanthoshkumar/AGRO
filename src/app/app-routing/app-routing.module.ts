import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierComponent } from '../supplier/supplier.component';
import { ShopComponent } from '../shop/shop.component';
import { FormerComponent } from '../former/former.component';
import { CustomerComponent } from '../customer/customer.component';
import { SupplierRegComponent } from '../supplier-reg/supplier-reg.component';
import { ShopRegComponent } from '../shop-reg/shop-reg.component';
import { CusRegComponent } from '../cus-reg/cus-reg.component';
import { FormerRegComponent } from "../former-reg/former-reg.component";
import { FarmerCheckGuard } from '../gaurd/farmer-check.guard';
import { SupplierCheckGuard } from '../gaurd/supplier-check.guard';
import { ShopCheckGuard } from '../gaurd/shop-check.guard';
import { ConsumerCheckGuard } from '../gaurd/consumer-check.guard';
import { AdminGuard } from '../gaurd/admin.guard';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { UserComponent } from '../user/user.component';
import { OverviewComponent } from '../overview/overview.component';
import { PersonsComponent } from '../persons/persons.component';
import { StockListComponent } from '../stock-list/stock-list.component';
import { ShopCropsComponent } from '../shop-crops/shop-crops.component';
import { ConsumerCropsComponent } from '../consumer-crops/consumer-crops.component';
import { FarmerwithdrawComponent } from '../farmerwithdraw/farmerwithdraw.component';
import { SupplierwithdrawComponent } from '../supplierwithdraw/supplierwithdraw.component';
import { ShopwithdrawComponent  } from '../shopwithdraw/shopwithdraw.component';
import { SignComponent } from '../sign/sign.component';
// import { OverviewHistoryComponent } from '../overview-history/overview-history.component';
import { TransactionhistoryComponent } from '../transactionhistory/transactionhistory.component';
import { FiltersComponent } from '../filters/filters.component';
import { MetamaskErrorComponent } from "../metamask-error/metamask-error.component";
import { LogincheckGuard } from '../gaurd/logincheck.guard';


const routes: Routes=[
  
  {
    path:'Former',
    component:FormerComponent,
    canActivate : [FarmerCheckGuard]
  
  },
  {
    path:'Farmerwithdraw',
    component:FarmerwithdrawComponent,
    canActivate : [FarmerCheckGuard]
  
  },
  {
    path:'Supplier',
    component:SupplierComponent,
    canActivate : [SupplierCheckGuard]
  
  },
  {
    path:'Supplierwithdraw',
    component:SupplierwithdrawComponent,
    canActivate : [SupplierCheckGuard]
  
  },
  {
    path:'Customer',
    component:CustomerComponent,
    canActivate : [ConsumerCheckGuard]
  
  },
  {
    path:'Shop',
    component:ShopComponent,
    canActivate : [ShopCheckGuard]
  },
  {
    path:'Shopwithdraw',
    component:ShopwithdrawComponent,
    canActivate : [ShopCheckGuard]
  },
  { 
    path: 'addsupplier',
    component: SupplierRegComponent,
  },
  { 
    path: 'addshop',
    component: ShopRegComponent,
  },
  { 
    path: 'addconsumer',
    component: CusRegComponent,
  },
  { 
    path: 'addfarmer',
    component: FormerRegComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate : [AdminGuard]
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'dashboard',
    component: OverviewComponent,
    canActivate : [AdminGuard]
  },
  {
    path: 'persons',
    component: PersonsComponent,
    canActivate : [AdminGuard]
  },
  {
    path: 'suppliercrops',
    component: StockListComponent,
    canActivate : [AdminGuard]
  },
  {
    path: 'shopcrops',
    component: ShopCropsComponent,
    canActivate : [AdminGuard]
  },
  {
    path: 'consumercrops',
    component: ConsumerCropsComponent,
    canActivate : [AdminGuard]
  },
  {
    path: 'Transaction',
    component: TransactionhistoryComponent,
    canActivate : [AdminGuard]
  },
  {
    path: 'sign',
    component: SignComponent,
  },
  { 
    path: 'metamask',
    component: MetamaskErrorComponent,
  },
  {
    path: 'Filters',
    component: FiltersComponent,
    canActivate : [AdminGuard]
  },  
  {
    path:'login',
    component: LoginComponent,
    canActivate: [LogincheckGuard]
  },
  {
    path:'',
    redirectTo:'/login',
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
export const routerComponent = [ ];