import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/clients/login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BasketPageComponent } from './components/basket-page/basket-page.component';
import { RegisterPageComponent } from './components/clients/register-page/register-page.component';
import { ProfilePageComponent } from './components/clients/profile-page/profile-page.component';
import { RestaurantListComponent } from './components/clients/restaurant-list/restaurant-list.component';
import { MenuPickPageComponent } from './components/clients/menu-pick-page/menu-pick-page.component';
import { ProductPageComponent } from './components/clients/product-page/product-page.component';
import { CreateArticleComponent } from './components/restaurants/create-article/create-article.component';
import { OrderPreviewComponent } from './components/restaurants/order-preview/order-preview.component';
import { CreateMenuComponent } from './components/restaurants/create-menu/create-menu.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginPageComponent,
		RegisterPageComponent,
		ProfilePageComponent,
		RestaurantListComponent,
		MenuPickPageComponent,
		ProductPageComponent,
		CreateArticleComponent,
		CreateMenuComponent,
		ProductPageComponent,
		BasketPageComponent,
		OrderPreviewComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		AngularMaterialModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
