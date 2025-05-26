import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FullscreenService } from '../shared/services/fullscreen.service';
import { SharedModule } from '../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  template: '',
})
class DummyComponent {}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let fullscreenService: FullscreenService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        RouterTestingModule.withRoutes([
          { path: 'test/path', component: DummyComponent },
        ]),
        SharedModule,
        MatSidenavModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: FullscreenService,
          useValue: {
            fullscreen$: of(true),
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fullscreenService = TestBed.inject(FullscreenService);
    fixture.detectChanges();
  });

  it('should create HomeComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize loggedUser on ngOnInit', () => {
    component.loggedUser = null as any;
    component.ngOnInit();
    expect(component.loggedUser).toBe('Usuário');
  });

  it('should toggle menuOpen state', () => {
    component.menuOpen = false;
    component.toggleMenu();
    expect(component.menuOpen).toBe(true);

    component.toggleMenu();
    expect(component.menuOpen).toBe(false);
  });

  it('should set isMobile based on window size', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });

    component.onResize({ target: window });

    expect(component.isMobile).toBe(true);
  });

  it('should set isFullscreen from fullscreenService observable', () => {
    expect(component.isFullscreen).toBe(true);
  });

  it('should update routeActive and mainRouteActive on router event', fakeAsync(() => {
    const router = TestBed.inject(Router);
    router.navigateByUrl('/test/path');
    tick();

    expect(component.routeActive).toContain('/test/path');
  }));

  it('should get menu width and set CSS variable', () => {
    component.sidenav = {
      _getWidth: () => 200,
    } as any;

    const setPropSpy = jest.spyOn(
      document.documentElement.style,
      'setProperty'
    );

    component.getMenuWidth();

    expect(setPropSpy).toHaveBeenCalledWith('--left-value', '209px');

    setPropSpy.mockRestore();
  });
});
