import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { OrderTrackingDashboardComponent } from './orderTracking-dashboard.component';

describe('OrderTrackingDashboardComponent', () => {
	let component: OrderTrackingDashboardComponent;
	let fixture: ComponentFixture<OrderTrackingDashboardComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [OrderTrackingDashboardComponent ]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(OrderTrackingDashboardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
