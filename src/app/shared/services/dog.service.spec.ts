import { TestBed } from '@angular/core/testing';
import { DogService } from './dog.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('DogService', () => {
  let service: DogService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DogService],
    });
    service = TestBed.inject(DogService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all breeds', () => {
    const mockResponse = [{ id: '1', name: 'Bulldog' }];

    service.findAll().subscribe((res) => {
      expect(res.length).toBe(1);
      expect(res[0].name).toBe('Bulldog');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/breeds`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should search breeds with query', () => {
    const query = 'bulldog';
    const mockResponse = [{ id: '1', name: 'Bulldog' }];

    service.findAll(query).subscribe((res) => {
      expect(res.length).toBe(1);
      expect(res[0].name).toBe('Bulldog');
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/breeds/search?q=${query}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
