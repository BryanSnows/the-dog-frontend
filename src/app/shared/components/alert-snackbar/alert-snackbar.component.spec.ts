import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertSnackbarComponent } from './alert-snackbar.component';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AlertSnackbarComponent', () => {
  let component: AlertSnackbarComponent;
  let fixture: ComponentFixture<AlertSnackbarComponent>;
  let mockSnackbar: jest.Mocked<MatSnackBar>;

  const mockData = {
    title: 'Sucesso!',
    subtitle: 'Operação realizada com sucesso.',
    type: 'success',
  };

  beforeEach(async () => {
    mockSnackbar = {
      dismiss: jest.fn(),
    } as unknown as jest.Mocked<MatSnackBar>;

    await TestBed.configureTestingModule({
      imports: [AlertSnackbarComponent, NoopAnimationsModule],
      providers: [
        { provide: MatSnackBar, useValue: mockSnackbar },
        { provide: MAT_SNACK_BAR_DATA, useValue: mockData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set title, subtitle and type from data', () => {
    expect(component.title).toBe(mockData.title);
    expect(component.subtitle).toBe(mockData.subtitle);
    expect(component.type).toBe(mockData.type);
  });

  it('should render title and subtitle in template', () => {
    const titleEl = fixture.debugElement.query(By.css('.title')).nativeElement;
    const subtitleEl = fixture.debugElement.query(
      By.css('.subtitle')
    ).nativeElement;

    expect(titleEl.textContent).toContain(mockData.title);
    expect(subtitleEl.textContent).toContain(mockData.subtitle);
  });

  it('should render correct icon for success type', () => {
    fixture.detectChanges();
    const iconEl = fixture.debugElement.query(By.css('mat-icon.success'));
    expect(iconEl).toBeTruthy();
    expect(iconEl.nativeElement.textContent).toContain('check_circle');
  });

  it('should call close() when close button is clicked', () => {
    const closeSpy = jest.spyOn(component, 'close');
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    expect(closeSpy).toHaveBeenCalled();
  });
});
