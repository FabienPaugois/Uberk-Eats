import { Component, NgModule, OnInit, AfterViewInit, ViewChild, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionLogs } from '../../model/connectionLogs';
import { ClientsApiService } from '../../services/clients-api.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatTab } from '@angular/material/tabs';
import { ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
	selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

	constructor(public clientsApi: ClientsApiService, public router: Router) { }

  ngOnInit(): void {
  }

}
