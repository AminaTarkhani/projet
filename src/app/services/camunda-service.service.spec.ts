import { TestBed } from '@angular/core/testing';

import { CamundaServiceService } from './camunda-service.service';

describe('CamundaServiceService', () => {
  let service: CamundaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CamundaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
