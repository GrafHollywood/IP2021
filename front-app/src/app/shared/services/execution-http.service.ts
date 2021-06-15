import { HttpClient } from '@angular/common/http';
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
  public getExecutionByMark(mark: string): Promise<Execution[]> {
    return this.http.get<Execution[]>(`${this.url}/execution/${mark}`).toPromise();
  }
}
