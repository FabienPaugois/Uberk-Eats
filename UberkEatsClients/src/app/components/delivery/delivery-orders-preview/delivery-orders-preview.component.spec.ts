import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryOrdersPreviewComponent } from './delivery-orders-preview.component';

describe('DeliveryOrdersPreviewComponent', () => {
	let component: DeliveryOrdersPreviewComponent;
	let fixture: ComponentFixture<DeliveryOrdersPreviewComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ DeliveryOrdersPreviewComponent ]
		})
			.compileComponents();

		fixture = TestBed.createComponent(DeliveryOrdersPreviewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
