import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionLogsListComponent } from './connectionLogs-list.component';

describe('RestaurantListComponent', () => {
  let component: ConnectionLogsListComponent;
  let fixture: ComponentFixture<ConnectionLogsListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
      declarations: [ ConnectionLogsListComponent ]
		})
			.compileComponents();
	});

	beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionLogsListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
