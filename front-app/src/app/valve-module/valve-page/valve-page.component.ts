import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Execution } from 'src/app/shared/interfaces/execution.interface';
import { ExecutionHttpService } from 'src/app/shared/services/execution-http.service';
import { ValveFull } from '../../shared/interfaces/valve.interface';
import { ValveHttpService } from '../../shared/services/valve-http.service';

@Component({
  selector: 'app-valve-page',
  templateUrl: './valve-page.component.html',
  styleUrls: ['./valve-page.component.css']
})
export class ValvePageComponent implements OnInit {
  valve!: ValveFull;
  execution!: Execution[];
  mark: string;
  constructor(private route: ActivatedRoute, private httpValve: ValveHttpService, private httpExecution: ExecutionHttpService, private router: Router) {
    this.route.params.subscribe(param => {
      this.mark = param.id;
    });
  }

  ngOnInit(): void {
    this.getValve();
    this.getExecution();
  }
  async getValve() {
    this.valve = await this.httpValve.getValveByMark(this.mark);
  }
  async getExecution() {
    this.execution = await this.httpExecution.getExecutionByMark(this.mark);
  }
  async onDelete() {
    await this.httpValve.deleteValve(this.valve.Model);
    this.router.navigateByUrl('/valve');
  }
}
