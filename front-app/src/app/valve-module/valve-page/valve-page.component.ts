import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Execution } from 'src/app/shared/interfaces/execution.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
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
  user;
  constructor(
    private route: ActivatedRoute,
    private httpValve: ValveHttpService,
    private httpExecution: ExecutionHttpService,
    private router: Router,
    private authService: AuthService) {
    this.route.params.subscribe(param => {
      this.mark = param.mark;
    });
    this.getUser();
  }

  ngOnInit(): void {
    this.getValve();
    this.getExecution();
  }

  async getUser() {
    this.user = await this.authService.getUser();
  }

  async getValve() {
    this.valve = await this.httpValve.getValveByMark(this.mark);
  }

  async getExecution() {
    this.execution = await this.httpExecution.getExecutionByMark(this.mark);
  }

  async onDelete() {
    if (!this.user) {
      this.router.navigateByUrl('login');
      return;
    }

    if (confirm('Вы точно хотите удалить клапан?')) {
      await this.httpValve.deleteValveByMark(this.valve.Model);
      this.router.navigateByUrl('/valve');
    }
  }
  async onDeleteExecution(DN: number) {
    if (!this.user) {
      this.router.navigateByUrl('login');
      return;
    }

    if (confirm('Вы точно хотите удалить исполнение?')) {
      await this.httpExecution.deleteExecution(this.valve.Model, DN);
      this.getExecution();
    }
  }
}
