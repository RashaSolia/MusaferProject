import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './component/signin/signin.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SearchComponent } from './component/search/search.component';
import { OrdersComponent } from './component/orders/orders.component';
import { DealsComponent } from './component/deals/deals.component';
import { AddOrderComponent } from './component/add-order/add-order.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationComponent } from './notification/notification.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../interceptors/jwt.interceptor';
import { MyTripComponent } from './component/my-trip/my-trip.component';
import { ShipmentDetailsComponent } from './component/shipment-details/shipment-details.component';
import { MyShipmentComponent } from './component/my-shipment/my-shipment.component';
import { ToastrModule } from 'ngx-toastr';
import { SearchPipe } from './search.pipe';
import { ResetCodeComponent } from './component/reset-code/reset-code.component';
  

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SigninComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    HomeComponent,
    NavbarComponent,
    SearchComponent,
    OrdersComponent,
    DealsComponent,
    AddOrderComponent,
    NotificationComponent,
    MyTripComponent,
    ShipmentDetailsComponent,
    MyShipmentComponent,
    SearchPipe,
    ResetCodeComponent
 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    BsDatepickerModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot() 
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
