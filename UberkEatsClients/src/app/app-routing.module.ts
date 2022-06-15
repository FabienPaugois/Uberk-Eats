import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateArticleComponent } from './components/restaurants/create-article/create-article.component';
import { LoginPageComponent } from './components/clients/login-page/login-page.component';
import { MenuPickPageComponent } from './components/clients/menu-pick-page/menu-pick-page.component';
import { ProductPageComponent } from './components/clients/product-page/product-page.component';
import { ProfilePageComponent } from './components/clients/profile-page/profile-page.component';
import { RegisterPageComponent } from './components/clients/register-page/register-page.component';
import { RestaurantListComponent } from './components/clients/restaurant-list/restaurant-list.component';

const routes: Routes = [
	{ path: 'login-page', component: LoginPageComponent },
	{ path: 'register-page', component: RegisterPageComponent },
	{ path: 'profile-page', component: ProfilePageComponent },
	{ path: 'restaurant-list', component: RestaurantListComponent },
	{ path: 'menu-pick-page', component: MenuPickPageComponent },
  { path: 'product-page', component: ProductPageComponent },
  { path: 'create-article', component: CreateArticleComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
