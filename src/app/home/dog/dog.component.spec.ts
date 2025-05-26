import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { of, throwError } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DogListComponent } from './dog-list/dog-list.component';
import { DogService } from '../../shared/services/dog.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DogListComponent', () => {
  let component: DogListComponent;
  let fixture: ComponentFixture<DogListComponent>;
  let dogService: jest.Mocked<DogService>;

  const mockDogs = [
    { id: '1', name: 'Bulldog', origin: 'UK', reference_image_id: 'abc' },
    { id: '2', name: 'Labrador', origin: 'Canada', reference_image_id: 'def' },
  ];

  beforeEach(async () => {
    const dogServiceMock = {
      findAll: jest.fn(),
      delete: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        DogListComponent,
        MatSnackBarModule,
        MatDialogModule,
        NoopAnimationsModule,
      ],
      providers: [{ provide: DogService, useValue: dogServiceMock }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DogListComponent);
    component = fixture.componentInstance;
    dogService = TestBed.inject(DogService) as jest.Mocked<DogService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load dogs on init', () => {
    dogService.findAll.mockReturnValue(of(mockDogs));
    fixture.detectChanges();

    expect(component.dogs.length).toBeGreaterThan(0);
    expect(component.isLoading).toBeFalsy();
  });

  it('should search dogs after delay', fakeAsync(() => {
    const searchTerm = 'bulldog';
    dogService.findAll.mockReturnValue(of(mockDogs));
    fixture.detectChanges();

    component.searchDogs(searchTerm);
    tick(500);

    expect(component.filters.search).toBe(searchTerm);
  }));

  it('should delete a dog', () => {
    dogService.delete.mockReturnValue(of({ message: 'Deleted' }));
    component.dogs = [...mockDogs];

    component.deleteDog(mockDogs[0]);

    expect(component.dogs.length).toBe(1);
    expect(component.dogs[0].id).toBe('2');
  });

  it('should handle API errors gracefully', () => {
    dogService.findAll.mockReturnValue(
      throwError(() => new Error('API Error'))
    );
    component.loadDogs(0);

    expect(component.isLoading).toBeFalsy();
  });

  it('should handle empty dog list', () => {
    dogService.findAll.mockReturnValue(of([]));
    component.loadDogs(0);

    expect(component.dogs.length).toBe(0);
    expect(component.titleMessage).toContain('Não há resultados');
  });

  it('should paginate correctly', () => {
    component.allDogs = Array.from({ length: 10 }, (_, i) => ({
      id: i.toString(),
      name: `Dog ${i}`,
    }));
    component.setPage(1);

    expect(component.dogs.length).toBe(5);
    expect(component.currentPage).toBe(1);
  });
});
