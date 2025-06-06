import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DogService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  findAll(search = ''): Observable<any> {
    if (search) {
      return this.http.get(`${this.apiUrl}/breeds/search?q=${search}`);
    }
    return this.http.get(`${this.apiUrl}/breeds`);
  }

  delete(id: string): Observable<any> {
    return new Observable((observer) => {
      observer.next({ message: 'Deleted' });
      observer.complete();
    });
  }
}
