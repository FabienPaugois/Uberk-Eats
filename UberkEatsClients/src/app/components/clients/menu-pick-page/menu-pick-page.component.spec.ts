import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPickPageComponent } from './menu-pick-page.component';

describe('MenuPickPageComponent', () => {
	let component: MenuPickPageComponent;
	let fixture: ComponentFixture<MenuPickPageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ MenuPickPageComponent ]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MenuPickPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
