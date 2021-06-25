import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ValveFull, ValveShort } from '../interfaces/valve.interface';

@Injectable({
  providedIn: 'root'
})
export class ValveHttpService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public getValves(): Promise<ValveShort[]> {
    return this.http.get<ValveShort[]>(`${this.url}/valve`).toPromise();
  }
  public getTightnessClass(): Promise<string[]> {
    return this.http.get<string[]>(`${this.url}/conditions/tightness`).toPromise();
  }
  public getClimateClass(): Promise<string[]> {
    return this.http.get<string[]>(`${this.url}/conditions/climate`).toPromise();
  }
  public getWorkEnvList(): Promise<string[]> {
    return this.http.get<string[]>(`${this.url}/valve/env`).toPromise();
  }
  public getValveByMark(mark: string): Promise<ValveFull> {
    return this.http.get<ValveFull>(`${this.url}/valve/${mark}`).toPromise();
  }
  public updateValveByMark(mark: string, values: object) {
    return this.http.put(`${this.url}/valve/${mark}`, values).toPromise();
  }
  public getValveList(): Promise<string[]> {
    return this.http.get<string[]>(`${this.url}/valve/short`).toPromise();
  }
  public postValve(obj: object) {
    return this.http.post(`${this.url}/valve`, obj).toPromise();
  }
  public deleteValveByMark(mark: string) {
    return this.http.delete(`${this.url}/valve/${mark}`).toPromise();
  }
}
