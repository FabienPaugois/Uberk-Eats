import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersManagementPageComponent } from './users-management-page.component';

describe('UsersManagementPageComponent', () => {
  let component: UsersManagementPageComponent;
  let fixture: ComponentFixture<UsersManagementPageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
      declarations: [UsersManagementPageComponent ]
		})
			.compileComponents();
	});

	beforeEach(() => {
    fixture = TestBed.createComponent(UsersManagementPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
