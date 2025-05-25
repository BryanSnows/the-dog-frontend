import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DogDetailsModalComponent } from './dog-details-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DogDetailsModalComponent', () => {
  let component: DogDetailsModalComponent;
  let fixture: ComponentFixture<DogDetailsModalComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<DogDetailsModalComponent>>;

  const mockData = {
    name: 'Golden Retriever',
    reference_image_id: 'BJa4kxc4X',
    origin: 'Scotland',
    breed_group: 'Sporting',
    life_span: '10 - 12 years',
    weight: { metric: '25 - 34' },
    height: { metric: '55 - 61' },
    temperament: 'Friendly, Intelligent',
  };

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [DogDetailsModalComponent, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DogDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the dog name in title', () => {
    const titleEl = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(titleEl.textContent).toContain(mockData.name);
  });

  it('should display the correct image source when reference_image_id exists', () => {
    const imgEl: HTMLImageElement = fixture.debugElement.query(
      By.css('img')
    ).nativeElement;
    expect(imgEl.src).toContain(mockData.reference_image_id);
  });

  it('should display default image when reference_image_id is not provided', () => {
    component.data.reference_image_id = null;
    fixture.detectChanges();

    const imgEl: HTMLImageElement = fixture.debugElement.query(
      By.css('img')
    ).nativeElement;
    expect(imgEl.src).toContain('assets/images/default-dog.png');
  });

  it('should close the dialog when close() is called', () => {
    component.close();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should render all provided data correctly', () => {
    const infoEl = fixture.debugElement.query(By.css('.info')).nativeElement;
    expect(infoEl.textContent).toContain(mockData.origin);
    expect(infoEl.textContent).toContain(mockData.breed_group);
    expect(infoEl.textContent).toContain(mockData.life_span);
    expect(infoEl.textContent).toContain(mockData.weight.metric);
    expect(infoEl.textContent).toContain(mockData.height.metric);
    expect(infoEl.textContent).toContain(mockData.temperament);
  });

  it('should call close method when Fechar button is clicked', () => {
    spyOn(component, 'close');
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    expect(component.close).toHaveBeenCalled();
  });
});
