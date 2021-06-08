import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValveHttpService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public getValves(): Promise<object[]> {
    return this.http.get<object[]>(`${this.url}/valve`).toPromise();
  }
}
