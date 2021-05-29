import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-valve-add-form',
  templateUrl: './valve-add-form.component.html',
  styleUrls: ['./valve-add-form.component.css']
})
export class ValveAddFormComponent implements OnInit {
  valveForm!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    const controlls = {
      //основная информация
      mark: [null, [Validators.required, Validators.maxLength(20)]],
      purpose: [null, [Validators.required, Validators.maxLength(150)]],
      typeDrive: [null, [Validators.required]],
      //материал
      mainMaterial: [null, [Validators.required]],
      bodyMaterial: [null, [Validators.maxLength(50)]],
      capMaterial: [null, [Validators.maxLength(50)]],
      oilSealMaterial: [null, [Validators.maxLength(50)]],
      oilSealPackMaterial: [null, [Validators.maxLength(50)]],
      spindleMaterial: [null, [Validators.maxLength(50)]],
      sealerMaterial: [null, [Validators.maxLength(50)]],
      gasketMaterial: [null, [Validators.maxLength(50)]],
      //условия эксплуатации
      tightnessClass: [null, [Validators.required]],
      operatingConditions: [null, [Validators.required]],
      warrantyOperation: [null, [Validators.required]],
      warrantyStorage: [null, [Validators.required]],
      warrantyTime: [null, [Validators.required]],
      conservation: [null, [Validators.required]],
      //рабочая среда
      workEnv: [null, [Validators.required, Validators.maxLength(150)]],
      tWork: [null, [Validators.required, Validators.pattern('[0-9]+')]],
      tEnv: [null, [Validators.required]],
      pressure: [null, [Validators.required]],
    };
    this.valveForm = this.fb.group(controlls);
  }

}
