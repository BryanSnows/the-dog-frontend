import { TestBed } from '@angular/core/testing';
import { FullscreenService } from './fullscreen.service';

describe('FullscreenService', () => {
  let service: FullscreenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullscreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set fullscreen value correctly', (done) => {
    service.setFullscreen(true);

    service.fullscreen$.subscribe((value) => {
      expect(value).toBeTrue();
      done();
    });
  });

  it('should return current fullscreen value', () => {
    service.setFullscreen(true);
    expect(service.getFullscreenValue()).toBeTrue();

    service.setFullscreen(false);
    expect(service.getFullscreenValue()).toBeFalse();
  });
});
