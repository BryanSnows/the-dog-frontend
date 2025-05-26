import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();

Object.defineProperty(HTMLElement.prototype, 'animate', {
  value: () => ({
    play: () => {},
    pause: () => {},
    finish: () => {},
    cancel: () => {},
    reverse: () => {},
    onfinish: null,
  }),
});
