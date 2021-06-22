import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FilterValve } from '../interfaces/filter.interface';
import { ValveShort } from '../interfaces/valve.interface';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public getFilterValve(filter: FilterValve): Promise<ValveShort[]> {
    console.log(filter);
    const params = new HttpParams()
      .set('DN', filter.DN.toString())
      .set('PN', filter.PN.toString())
      .set('classTightness', filter.classTightness.toString())
      .set('climateCondition', filter.climateCondition.toString())
      .set('material', filter.material.toString())
      .set('workEnv', filter.workEnv.toString())
      .set('tEnw', filter.tEnw.toString())
      .set('typeConnect', filter.typeConnect.toString())
    const options = { params: params }
    return this.http.get<ValveShort[]>(`${this.url}/valve/filter`, options).toPromise();
  }
}
