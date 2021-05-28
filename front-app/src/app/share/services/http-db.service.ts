import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Valve } from '../interfaces/valve.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpDbService {

  url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getValveList(): Promise<Valve> {
    return this.http.get<Valve>(`${this.url}/valve`).toPromise();
  }
}
