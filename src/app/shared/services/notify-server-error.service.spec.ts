import { TestBed } from '@angular/core/testing';

import { NotifyServerErrorService } from './notify-server-error.service';

describe('NotifyServerErrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotifyServerErrorService = TestBed.get(NotifyServerErrorService);
    expect(service).toBeTruthy();
  });
});
