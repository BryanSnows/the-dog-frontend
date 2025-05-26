import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationModalComponent } from './confirmation-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;
  let mockDialogRef: jest.Mocked<MatDialogRef<ConfirmationModalComponent>>;

  const mockData = {
    title: 'Confirmação',
    message: 'Deseja realmente prosseguir?',
    iconPath: 'assets/icon.png',
    buttonClass: 'btn-primary',
    buttonAction: 'Confirmar',
  };

  beforeEach(async () => {
    mockDialogRef = {
      close: jest.fn(),
    } as unknown as jest.Mocked<MatDialogRef<ConfirmationModalComponent>>;

    await TestBed.configureTestingModule({
      imports: [ConfirmationModalComponent, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title and message', () => {
    const titleEl = fixture.debugElement.query(
      By.css('.modal-title')
    ).nativeElement;
    const messageEl = fixture.debugElement.query(
      By.css('.message p')
    ).nativeElement;

    expect(titleEl.textContent).toContain(mockData.title);
    expect(messageEl.innerHTML).toContain(mockData.message);
  });

  it('should set image src to iconPath', () => {
    const imgEl: HTMLImageElement = fixture.debugElement.query(
      By.css('img')
    ).nativeElement;
    expect(imgEl.src).toContain(mockData.iconPath);
  });

  it('should call dialogRef.close(true) when onButtonClick is called', () => {
    component.onButtonClick();
    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should call onButtonClick when confirm button is clicked', () => {
    const onButtonClickSpy = jest.spyOn(component, 'onButtonClick');
    const button = fixture.debugElement.queryAll(By.css('button'))[1]
      .nativeElement;
    button.click();
    expect(onButtonClickSpy).toHaveBeenCalled();
  });
});
