import { Component, NgModule, OnInit, AfterViewInit, ViewChild, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { Notifications } from './model/notifications';
import { NotificationsApiService } from './services/notifications-api.service';
import { AuthGuard } from './auth.guard';
import { ClientsApiService } from './services/clients-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'UberkEatsClients';
  hidden = true;
  notificationsNumber = 0;
  constructor(
    public notificationsApi: NotificationsApiService,
    public router: Router,
    public clientsApiService: ClientsApiService,
    public authGuard: AuthGuard
  ) { }

  ngOnInit(): void {
    this.getUserUnreadNotifications();
    setInterval(() => {
      this.getUserUnreadNotifications();
    }, 5000);
  }

  getUserUnreadNotifications() {
    this.notificationsApi.getUserUnreadNotifications(JSON.parse(localStorage.getItem('User') as string).Id)
      .subscribe((notifications: Notifications[]) => {
        if (notifications.length > 0) {
          this.hidden = false;
        }
        else {
          this.hidden = true;
        }
        this.notificationsNumber = notifications.length;
      });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login-page']);
  }
}
