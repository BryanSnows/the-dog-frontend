import { TestBed } from '@angular/core/testing';
import { FullscreenService } from './fullscreen.service';
import { firstValueFrom } from 'rxjs';

describe('FullscreenService', () => {
  let service: FullscreenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullscreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set fullscreen value correctly', async () => {
    service.setFullscreen(true);

    const value = await firstValueFrom(service.fullscreen$);
    expect(value).toBe(true);
  });

  it('should return current fullscreen value', () => {
    service.setFullscreen(true);
    expect(service.getFullscreenValue()).toBe(true);

    service.setFullscreen(false);
    expect(service.getFullscreenValue()).toBe(false);
  });
});
