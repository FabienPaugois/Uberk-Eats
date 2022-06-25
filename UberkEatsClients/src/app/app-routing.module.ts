import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateArticleComponent } from './components/restaurants/create-article/create-article.component';
import { LoginPageComponent } from './components/clients/login-page/login-page.component';
import { MenuPickPageComponent } from './components/clients/menu-pick-page/menu-pick-page.component';
import { ProductPageComponent } from './components/clients/product-page/product-page.component';
import { ProfilePageComponent } from './components/clients/profile-page/profile-page.component';
import { RegisterPageComponent } from './components/clients/register-page/register-page.component';
import { RestaurantListComponent } from './components/clients/restaurant-list/restaurant-list.component';
import { BasketPageComponent } from './components/basket-page/basket-page.component';
import { OrdersPreviewComponent } from './components/restaurants/orders-preview/orders-preview.component';
import { CreateMenuComponent } from './components/restaurants/create-menu/create-menu.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OrderPreviewComponent } from './components/order-preview/order-preview.component';
import { DeliveryOrdersPreviewComponent } from './components/delivery/delivery-orders-preview/delivery-orders-preview.component';

import { AuthGuard } from './auth.guard';
import { Roles } from './model/roles';

const routes: Routes = [
	{ path: 'login-page', component: LoginPageComponent},
	{ path: 'register-page', component: RegisterPageComponent},
	{ path: 'profile-page', component: ProfilePageComponent},
	{ path: 'restaurant-list', component: RestaurantListComponent, data: {roles: [Roles.client]}, canActivate: [AuthGuard]},
	{ path: 'menu-pick-page', component: MenuPickPageComponent, data: {roles: [Roles.client]}, canActivate: [AuthGuard]},
	{ path: 'product-page', component: ProductPageComponent, data: {roles: [Roles.client]}, canActivate: [AuthGuard]},
	{ path: 'create-article', component: CreateArticleComponent, data: {roles: [Roles.restaurantOwner]}, canActivate: [AuthGuard]},
	{ path: 'create-menu', component: CreateMenuComponent, data: {roles: [Roles.restaurantOwner]}, canActivate: [AuthGuard]},
	{ path: 'basket-page', component: BasketPageComponent, data: {roles: [Roles.client]}, canActivate: [AuthGuard]},
	{ path: 'orders-preview', component: OrdersPreviewComponent, data: {roles: [Roles.restaurantOwner, Roles.deliveryMan]}, canActivate: [AuthGuard]},
	{ path: 'order-history', component: OrderHistoryComponent, data: {roles: [Roles.client]}, canActivate: [AuthGuard]},
	{ path: 'order-preview', component: OrderPreviewComponent, data: {roles: []}, canActivate: [AuthGuard]},
	{ path: 'delivery-orders-preview', component: DeliveryOrdersPreviewComponent, data: {roles: [Roles.deliveryMan]}, canActivate: [AuthGuard]},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
