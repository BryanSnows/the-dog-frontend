import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomeComponent } from './welcome.component';
import { By } from '@angular/platform-browser';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, CommonModule, WelcomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render welcome title', () => {
    const titleElement = fixture.debugElement.query(
      By.css('.welcome-title')
    ).nativeElement;
    expect(titleElement.textContent).toContain('Bem-vindo ao The Dog!');
  });

  it('should render welcome subtitle', () => {
    const subtitleElement = fixture.debugElement.query(
      By.css('.welcome-subtitle')
    ).nativeElement;
    expect(subtitleElement.textContent).toContain(
      'Sistema desenvolvido com Angular'
    );
  });

  it('should render user greeting', () => {
    const headerTitle = fixture.debugElement.query(
      By.css('.module-title')
    ).nativeElement;
    expect(headerTitle.textContent).toContain('Olá, Usuário');
  });

  it('should render image', () => {
    const image = fixture.debugElement.query(By.css('.logo'))
      .nativeElement as HTMLImageElement;
    expect(image.src).toContain('dog-cuarte.png');
    expect(image.alt).toBe('Board');
  });
});
