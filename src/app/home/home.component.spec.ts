import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FullscreenService } from '../shared/services/fullscreen.service';
import { MenuListComponent } from './layouts/menu-list/menu-list.component';
import { SharedModule } from '../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let fullscreenService: FullscreenService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule, MatSidenavModule],
      declarations: [HomeComponent, MenuListComponent],
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
    expect(component.menuOpen).toBeTrue();

    component.toggleMenu();
    expect(component.menuOpen).toBeFalse();
  });

  it('should set isMobile based on window size', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(500);
    component.onResize({ target: window });
    expect(component.isMobile).toBeTrue();

    spyOnProperty(window, 'innerWidth').and.returnValue(1024);
    component.onResize({ target: window });
    expect(component.isMobile).toBeFalse();
  });

  it('should set isFullscreen from fullscreenService observable', () => {
    expect(component.isFullscreen).toBeTrue();
  });

  it('should update routeActive and mainRouteActive on router event', fakeAsync(() => {
    const router = TestBed.inject(RouterTestingModule);
    component['router'].navigateByUrl('/test/path');
    tick();
    expect(component.routeActive).toContain('/test/path');
  }));

  it('should get menu width and set CSS variable', () => {
    component.sidenav = {
      _getWidth: () => 200,
    } as any;

    spyOn(document.documentElement.style, 'setProperty');
    component.getMenuWidth();

    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
      '--left-value',
      '209px'
    );
  });
});
