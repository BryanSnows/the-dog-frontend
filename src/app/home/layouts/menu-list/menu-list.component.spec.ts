import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuListComponent } from './menu-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

describe('MenuListComponent', () => {
  let component: MenuListComponent;
  let fixture: ComponentFixture<MenuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MenuListComponent,
        RouterTestingModule.withRoutes([]),
        MatDialogModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize user data on ngOnInit', () => {
    component.ngOnInit();
    expect(component.userName).toBe('Usuário');
    expect(component.userRole).toBe('ADMIN');
    expect(component.userImage).toContain('profile-icon.svg');
  });

  it('should unsubscribe on ngOnDestroy', () => {
    const spy = spyOn(
      component['subscriptions'],
      'unsubscribe'
    ).and.callThrough();
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  it('should navigate to the correct module on goToModule', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');
    component.goToModule('/dogs');
    expect(navigateSpy).toHaveBeenCalledWith(['/dogs']);
  });

  it('should set isMobile correctly on resize', () => {
    const innerWidthSpy = spyOnProperty(window, 'innerWidth', 'get');

    innerWidthSpy.and.returnValue(500);
    component.onResize({});
    expect(component.isMobile).toBeTrue();

    innerWidthSpy.and.returnValue(1024);
    component.onResize({});
    expect(component.isMobile).toBeFalse();
  });

  it('should update routeActive and isEditing on router events', () => {
    component['router'].navigate(['/edit/123']);
    fixture.detectChanges();

    setTimeout(() => {
      expect(component.routeActive).toContain('/edit');
      expect(component.isEditing).toBeTrue();
    }, 0);
  });

  it('should render the user name and role in template', () => {
    component.userName = 'Test User';
    component.userRole = 'TEST_ROLE';
    fixture.detectChanges();

    const usernameElement = fixture.debugElement.query(
      By.css('.username-label')
    ).nativeElement;
    const roleElement = fixture.debugElement.query(
      By.css('.role-label')
    ).nativeElement;

    expect(usernameElement.textContent).toContain('Test User');
    expect(roleElement.textContent).toContain('TEST_ROLE');
  });
});
