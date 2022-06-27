import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsApiService } from '../../../services/notifications-api.service';

@Component({
	selector: 'app-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.scss']
})
export class NotificationsPageComponent implements OnInit {

  constructor(public notifsApi: NotificationsApiService, public router: Router) {

  }

  ngOnInit(): void {
    this.markNotificationsAsRead();
  }
  markNotificationsAsRead() {
    this.notifsApi.markNotificationsAsRead(JSON.parse(localStorage.getItem('User') as string).Id).subscribe((data: unknown) => {
      });
  }
}
