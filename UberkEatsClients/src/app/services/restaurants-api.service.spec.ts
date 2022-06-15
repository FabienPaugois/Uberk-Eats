import { TestBed } from '@angular/core/testing';

import { RestaurantsApiService } from './restaurants-api.service';

describe('RestaurantsApiService', () => {
  let service: RestaurantsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
