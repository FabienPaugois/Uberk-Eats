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
import { ConnectionLogsListComponent } from './components/technicalService/connectionLogs-list/connectionLogs-list.component';
import { NotificationsPageComponent } from './components/clients/notifications-page/notifications-page.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

import { AuthGuard } from './auth.guard';
import { Roles } from './model/roles';
import { OrderTrackingDashboardComponent } from './components/commercialService/orderTracking-dashboard/orderTracking-dashboard.component';
import { UsersManagementPageComponent } from './components/commercialService/users-management-page/users-management-page.component';

const routes: Routes = [
	{
		path: 'login-page', component: LoginPageComponent,
		data: { name: 'Connexion' }
	},

	{
		path: 'register-page', component: RegisterPageComponent,
		data: { name: 'Inscription' }
	},

	{
		path: 'profile-page', component: ProfilePageComponent,
		data: { name: 'Mon profil' }
	},

	{
		path: 'restaurant-list', component: RestaurantListComponent,
		data: { roles: [Roles.client], name: 'Restaurants' }, canActivate: [AuthGuard]
	},

	{
		path: 'orders-preview', component: OrdersPreviewComponent,
		data: { roles: [Roles.restaurantOwner], name: 'Commandes re??ues' }, canActivate: [AuthGuard]
	},

	{
		path: 'product-page', component: ProductPageComponent,
		data: { roles: [Roles.client], name: 'Choisir cet article', hidden: true }, canActivate: [AuthGuard]
	},

	{
		path: 'order-history', component: OrderHistoryComponent,
		data: {
			roles: [Roles.client, Roles.deliveryMan, Roles.restaurantOwner],
			name: 'Historique des commandes'
		}, canActivate: [AuthGuard]
	},

	{
		path: 'create-article', component: CreateArticleComponent,
		data: { roles: [Roles.restaurantOwner], name: 'Cr??er un article' }, canActivate: [AuthGuard]
	},

	{
		path: 'create-menu', component: CreateMenuComponent,
		data: { roles: [Roles.restaurantOwner], name: 'Cr??er un menu' }, canActivate: [AuthGuard]
	},

	{
		path: 'basket-page', component: BasketPageComponent,
		data: { roles: [Roles.client], name: 'Panier' }, canActivate: [AuthGuard]
	},

	{
		path: 'delivery-orders-preview', component: DeliveryOrdersPreviewComponent,
		data: { roles: [Roles.deliveryMan], name: 'Commandes en cours' }, canActivate: [AuthGuard]
	},

	{
		path: 'connectionLogs-list', component: ConnectionLogsListComponent,
		data: { roles: [Roles.technicalService], name: 'Historique de connexions' }, canActivate: [AuthGuard]
	},

	{
		path: 'notifications-page', component: NotificationsPageComponent,
		data: { name: 'Notifications' }, canActivate: [AuthGuard]
	},

	{
		path: 'statistics-page', component: StatisticsComponent,
		data: { roles: [Roles.restaurantOwner, Roles.commercialService], name: 'Statistiques' }, canActivate: [AuthGuard]
	},

	{
		path: 'orderTracking-dashboard', component: OrderTrackingDashboardComponent,
		data: { roles: [Roles.commercialService], name: 'Suivi de commandes' }, canActivate: [AuthGuard]
	},

	{
		path: 'users-management-page', component: UsersManagementPageComponent,
		data: { roles: [Roles.commercialService], name: 'Gestion des comptes utilisateurs' }, canActivate: [AuthGuard]
	},

	{
		path: 'menu-pick-page', component: MenuPickPageComponent,
		data: { roles: [Roles.client], name: '' }, canActivate: [AuthGuard]
	},

	{
		path: 'product-page', component: ProductPageComponent,
		data: { roles: [Roles.client], name: '' }, canActivate: [AuthGuard]
	},

	{
		path: 'order-preview', component: OrderPreviewComponent,
		data: { roles: [Roles.client, Roles.restaurantOwner, Roles.deliveryMan], name: '' }, canActivate: [AuthGuard]
	},

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
