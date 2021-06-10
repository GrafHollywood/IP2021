import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ValveShort } from '../interfaces/valve.interface';

@Injectable({
  providedIn: 'root'
})
export class ValveHttpService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public getValves(): Promise<ValveShort[]> {
    return this.http.get<ValveShort[]>(`${this.url}/valve`).toPromise();
  }
}
