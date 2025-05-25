import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FullscreenService {
  private readonly fullscreenSubject = new BehaviorSubject<boolean>(false);
  fullscreen$ = this.fullscreenSubject.asObservable();

  setFullscreen(value: boolean) {
    this.fullscreenSubject.next(value);
  }

  getFullscreenValue(): boolean {
    return this.fullscreenSubject.getValue();
  }
}
