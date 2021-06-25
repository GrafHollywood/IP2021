import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Execution } from '../interfaces/execution.interface';

@Injectable({
  providedIn: 'root'
})
export class ExecutionHttpService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public postExecution(obj: object) {
    return this.http.post(`${this.url}/execution`, obj).toPromise();
  }
  public deleteExecution(mark: string, DN: number) {
    const params = new HttpParams()
      .set('model', mark)
      .set('DN', DN.toString());

    const options = { params: params }
    return this.http.delete(`${this.url}/execution/delete`, options).toPromise();
  }
  public updateExecution(execution: Execution) {
    return this.http.put(`${this.url}/execution/edit`, execution).toPromise();
  }
  public getExecutionByMark(mark: string): Promise<Execution[]> {
    return this.http.get<Execution[]>(`${this.url}/execution/${mark}`).toPromise();
  }
}
