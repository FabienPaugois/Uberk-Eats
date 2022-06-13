import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MenuPickPageComponent } from './components/menu-pick-page/menu-pick-page.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';

const routes: Routes = [
	{ path: 'login-page', component: LoginPageComponent },
	{ path: 'register-page', component: RegisterPageComponent },
	{ path: 'profile-page', component: ProfilePageComponent },
	{ path: 'restaurant-list', component: RestaurantListComponent },
  { path: 'menu-pick-page', component: MenuPickPageComponent },
  { path: 'product-page', component: ProductPageComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
