import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyMenuComponent } from './modify-menu.component';

describe('ModifyMenuComponent', () => {
	let component: ModifyMenuComponent;
	let fixture: ComponentFixture<ModifyMenuComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ ModifyMenuComponent ]
		})
			.compileComponents();

		fixture = TestBed.createComponent(ModifyMenuComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
