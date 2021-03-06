import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/clients/login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasketPageComponent } from './components/basket-page/basket-page.component';
import { RegisterPageComponent } from './components/clients/register-page/register-page.component';
import { ProfilePageComponent } from './components/clients/profile-page/profile-page.component';
import { RestaurantListComponent } from './components/clients/restaurant-list/restaurant-list.component';
import { MenuPickPageComponent } from './components/clients/menu-pick-page/menu-pick-page.component';
import { ProductPageComponent } from './components/clients/product-page/product-page.component';
import { CreateArticleComponent } from './components/restaurants/create-article/create-article.component';
import { OrdersPreviewComponent } from './components/restaurants/orders-preview/orders-preview.component';
import { CreateMenuComponent } from './components/restaurants/create-menu/create-menu.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OrderPreviewComponent } from './components/order-preview/order-preview.component';
import { DeliveryOrdersPreviewComponent } from './components/delivery/delivery-orders-preview/delivery-orders-preview.component';
import { MatTableModule } from '@angular/material/table';
import { ConnectionLogsListComponent } from './components/technicalService/connectionLogs-list/connectionLogs-list.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { NotificationsPageComponent } from './components/clients/notifications-page/notifications-page.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ModifyArticleComponent } from './components/restaurants/modify-article/modify-article.component';
import { UsersManagementPageComponent } from './components/commercialService/users-management-page/users-management-page.component';
import { ModifyMenuComponent } from './components/restaurants/modify-menu/modify-menu.component';


@NgModule({
	declarations: [
		AppComponent,
		LoginPageComponent,
		RegisterPageComponent,
		StatisticsComponent,
		ProfilePageComponent,
		NotificationsPageComponent,
		UsersManagementPageComponent,
		RestaurantListComponent,
		ConnectionLogsListComponent,
		MenuPickPageComponent,
		ProductPageComponent,
		CreateArticleComponent,
		CreateMenuComponent,
		ProductPageComponent,
		BasketPageComponent,
		OrdersPreviewComponent,
		OrderHistoryComponent,
		OrderPreviewComponent,
		DeliveryOrdersPreviewComponent,
  		ModifyArticleComponent,
		ModifyMenuComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		AngularMaterialModule,
		FormsModule,
		ReactiveFormsModule,
		MatTableModule
	],
	providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
	bootstrap: [AppComponent]
})
export class AppModule { }
