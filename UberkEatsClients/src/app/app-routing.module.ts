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

const routes: Routes = [
	{ path: 'login-page', component: LoginPageComponent },
	{ path: 'register-page', component: RegisterPageComponent },
	{ path: 'profile-page', component: ProfilePageComponent },
	{ path: 'restaurant-list', component: RestaurantListComponent },
	{ path: 'menu-pick-page', component: MenuPickPageComponent },
	{ path: 'product-page', component: ProductPageComponent },
	{ path: 'create-article', component: CreateArticleComponent },
	{ path: 'create-menu', component: CreateMenuComponent },
	{ path: 'product-page', component: ProductPageComponent },
	{ path: 'basket-page', component: BasketPageComponent },
  { path: 'orders-preview', component: OrdersPreviewComponent },
  { path: 'order-history', component: OrderHistoryComponent },
  { path: 'order-preview', component: OrderPreviewComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
