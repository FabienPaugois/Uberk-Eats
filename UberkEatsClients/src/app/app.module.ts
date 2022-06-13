import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { MenuPickPageComponent } from './components/menu-pick-page/menu-pick-page.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginPageComponent,
		RegisterPageComponent,
		ProfilePageComponent,
		RestaurantListComponent,
		MenuPickPageComponent
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
