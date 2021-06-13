import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValveHttpService } from '../shared/services/valve-http.service';

@Component({
  selector: 'app-add-execution',
  templateUrl: './add-execution.component.html',
  styleUrls: ['./add-execution.component.css']
})
export class AddExecutionComponent implements OnInit {
  executionForm!: FormGroup;
  modelList: string[];
  constructor(private fb: FormBuilder, private httpService: ValveHttpService) { }

  ngOnInit(): void {
    this.getModels();

    this.executionForm = this.fb.group({
      mark: [null, [Validators.required]],
      d: [null, [Validators.required]],
      l: [null, []],
      h: [null, []],
      Type_connect: [null, [Validators.required]],
      n_connect: [null, []],
      d_connect: [null, []],
      D1_connect: [null, []],
      D2_connect: [null, []],
      Weight: [null, [Validators.required]],
    })
  }
  async getModels() {
    this.modelList = await this.httpService.getValveList();
  }

  onAddExecution() {
    const values = this.executionForm.value;
    this.httpService.postExecution(values);
    this.executionForm.reset();
  }
}
