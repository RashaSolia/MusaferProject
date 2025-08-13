import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';
 
import { AddOrderComponent } from './component/add-order/add-order.component';
 import { DealsComponent } from './component/deals/deals.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { HomeComponent } from './component/home/home.component';
import { MyShipmentComponent } from './component/my-shipment/my-shipment.component';
import { MyTripComponent } from './component/my-trip/my-trip.component';
import { OrdersComponent } from './component/orders/orders.component';
import { ResetCodeComponent } from './component/reset-code/reset-code.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { ShipmentDetailsComponent } from './component/shipment-details/shipment-details.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { SigninComponent } from './component/signin/signin.component';
import { NotificationComponent } from './notification/notification.component';
 
const routes: Routes = [
  { path: '', redirectTo: 'Orders', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'Deals', canActivate:[authGuard],component: DealsComponent },
  { path: 'Orders', canActivate:[authGuard],component: OrdersComponent  },
  { path: 'home',  canActivate:[authGuard],component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'addOrder',  canActivate:[authGuard],component: AddOrderComponent },
  { path: 'notification', canActivate:[authGuard], component:NotificationComponent },
  { path: 'myTrip', canActivate:[authGuard], component:MyTripComponent },
  { path: 'shipmentDetails/:id', canActivate:[authGuard], component:ShipmentDetailsComponent },
  { path: 'myShipment', canActivate:[authGuard], component:MyShipmentComponent },
  { path: 'resetCode', component:ResetCodeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
