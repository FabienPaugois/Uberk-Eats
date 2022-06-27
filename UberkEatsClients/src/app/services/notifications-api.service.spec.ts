import { TestBed } from '@angular/core/testing';

import { NotificationsApiService } from './notifications-api.service';

describe('ClientsApiService', () => {
  let service: NotificationsApiService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationsApiService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
