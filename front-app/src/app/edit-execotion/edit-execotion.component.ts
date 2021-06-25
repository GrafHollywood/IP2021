import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Execution } from '../shared/interfaces/execution.interface';
import { ExecutionHttpService } from '../shared/services/execution-http.service';
import { ValveHttpService } from '../shared/services/valve-http.service';

@Component({
  selector: 'app-edit-execotion',
  templateUrl: './edit-execotion.component.html',
  styleUrls: ['./edit-execotion.component.css']
})
export class EditExecotionComponent implements OnInit {
  executionForm!: FormGroup;
  execution: Execution
  constructor(private fb: FormBuilder, private httpExecution: ExecutionHttpService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe((params: Execution) => {
      this.execution = params;
    })
  }

  ngOnInit(): void {
    this.executionForm = this.fb.group({
      Model: [{ value: this.execution.Model, disabled: true }, [Validators.required]],
      D: [{ value: this.execution.D, disabled: true }, [Validators.required,]],
      L: [this.execution.L, []],
      H: [this.execution.H, []],
      Type_connect: [this.execution.Type_connect, [Validators.required]],
      n_connect: [this.execution.n_connect, []],
      d_connect: [this.execution.d_connect, []],
      D1_connect: [this.execution.D1_connect, []],
      D2_connect: [this.execution.D2_connect, []],
      Weight: [this.execution.Weight, [Validators.required]],
    });
  }
  async onEditExecution() {
    const values = this.executionForm.value;
    values.Model = this.execution.Model;
    values.DN = this.execution.D;
    await this.httpExecution.updateExecution(values);
    this.router.navigateByUrl(`valve/${this.execution.Model}`);
  }
}
