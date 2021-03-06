import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { StatisticsComponent } from './statistics.component';

describe('ConnectionLogsListComponent', () => {
	let component: StatisticsComponent;
	let fixture: ComponentFixture<StatisticsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [StatisticsComponent ]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(StatisticsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
