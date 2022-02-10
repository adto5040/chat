import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be possible to get, store and remove a user', () => {
    expect(service.getUser()).toBe(null);
    service.setUsername('Adrian');
    expect(service.getUser()).toBe('Adrian');
    service.removeUser();
    expect(service.getUser()).toBe(null);
  });
});
