import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Notifications } from '../../../model/notifications';
import { NotificationsApiService } from '../../../services/notifications-api.service';

@Component({
	selector: 'app-notifications-page',
	templateUrl: './notifications-page.component.html',
	styleUrls: ['./notifications-page.component.scss']
})
export class NotificationsPageComponent implements OnInit {
	dataSource = new MatTableDataSource<Notifications>([]);
	displayedColumns: string[] = ['title', 'createdAt', 'content'];

	constructor(public notifsApi: NotificationsApiService, public router: Router, private liveAnnouncer: LiveAnnouncer) { }

  @ViewChild(MatSort, { static: false })
	set sort(v: MatSort) {
		this.dataSource.sort = v;
	}

  @ViewChild(MatPaginator, { static: false })
  set paginator(v: MatPaginator) {
  	this.dataSource.paginator = v;
  }

  announceSortChange(sortState: Sort) {
  	if (sortState.direction) {
  		this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  	} else {
  		this.liveAnnouncer.announce('Sorting cleared');
  	}
  }

  ngOnInit(): void {
  	this.dataSource.paginator = this.paginator;
  	this.markNotificationsAsRead();
  	this.getAllNotifications();
  }

  hideLoader() {
  	const loader = document.getElementById('loader');
  	if (loader !== null) {
  		loader.hidden = true;
  	}
  }

  markNotificationsAsRead() {
  	this.notifsApi.markNotificationsAsRead(JSON.parse(localStorage.getItem('User') as string).Id).subscribe((data: unknown) => {
  	});
  }

  getAllNotifications() {
  	this.notifsApi.getUserNotifications(JSON.parse(localStorage.getItem('User') as string).Id)
  		.subscribe((userNotifications: Notifications[]) => {
  		this.dataSource.data = userNotifications;
  		this.hideLoader();
  		console.log(userNotifications);
  	});
  }
}
