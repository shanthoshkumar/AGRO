import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SupplierComponent } from './supplier/supplier.component';
import { ShopComponent } from './shop/shop.component';
import { FormerComponent } from './former/former.component';
import { CustomerComponent } from './customer/customer.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormerRegComponent } from './former-reg/former-reg.component';
import { CusRegComponent } from './cus-reg/cus-reg.component';
import { ShopRegComponent } from './shop-reg/shop-reg.component';
import { SupplierRegComponent } from './supplier-reg/supplier-reg.component';
import { HomeComponent } from './home/home.component';
import { OverviewComponent } from './overview/overview.component';
import { UserComponent } from './user/user.component';
import { FarmerwithdrawComponent } from './farmerwithdraw/farmerwithdraw.component';
import { SupplierwithdrawComponent } from './supplierwithdraw/supplierwithdraw.component';
import { ShopwithdrawComponent  } from './shopwithdraw/shopwithdraw.component';
import { PersonsComponent } from './persons/persons.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { ShopCropsComponent } from './shop-crops/shop-crops.component';
import { ConsumerCropsComponent } from './consumer-crops/consumer-crops.component';
import { SignComponent } from './sign/sign.component';
// import { OverviewHistoryComponent } from './overview-history/overview-history.component';
import { TransactionhistoryComponent } from './transactionhistory/transactionhistory.component';
import {HttpClientModule} from '@angular/common/http';
import { FiltersComponent } from './filters/filters.component';
// import { SelectDropDownModule } from 'ngx-select-dropdown';
import { MetamaskErrorComponent } from "./metamask-error/metamask-error.component";

//for cookie services to store privatekey

import {CookieService} from "ngx-cookie-service";
import { LoginComponent } from './login/login.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SupplierComponent,
    ShopComponent,
    FormerComponent,
    CustomerComponent,
    FormerRegComponent,
    CusRegComponent,
    ShopRegComponent,
    SupplierRegComponent,
    HomeComponent,
    OverviewComponent,
    UserComponent,
    PersonsComponent,
    StockListComponent,
    ShopCropsComponent,
    ConsumerCropsComponent,
    SignComponent,
    FarmerwithdrawComponent,
    SupplierwithdrawComponent,
    ShopwithdrawComponent,
    // OverviewHistoryComponent,
    TransactionhistoryComponent,
    FiltersComponent,
    MetamaskErrorComponent,
    LoginComponent
    // SelectDropDownModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
