import { Component, NgModule, OnInit, AfterViewInit, ViewChild, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionLogs } from '../../../model/connectionLogs';
import { ClientsApiService } from '../../../services/clients-api.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatTab } from '@angular/material/tabs';
import { ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
	selector: 'app-connectionlogs-list',
	templateUrl: './connectionLogs-list.component.html',
	styleUrls: ['./connectionLogs-list.component.scss']
})
export class ConnectionLogsListComponent implements OnInit {

	dataSource = new MatTableDataSource<ConnectionLogs>([]);
	displayedColumns: string[] = ['userId', 'date', 'description'];

	constructor(public clientsApi: ClientsApiService, public router: Router, private liveAnnouncer: LiveAnnouncer) { }

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
  	this.getConnectionLogs();
	}

  hideHeader() {
  	const loader = document.getElementById('loader');
  	if (loader !== null) {
  		loader.hidden = true;
  	}
  }

	getConnectionLogs() {
  	this.clientsApi.getConnectionLogs().subscribe((connectionLogs: ConnectionLogs[]) => {
  		this.dataSource.data = connectionLogs;
  		this.hideHeader();
  	});
  }
}
