import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValveHttpService } from '../../shared/services/valve-http.service';

@Component({
  selector: 'app-add-valve',
  templateUrl: './add-valve.component.html',
  styleUrls: ['./add-valve.component.css']
})
export class AddValveComponent implements OnInit {
  valveForm!: FormGroup;
  materialForm!: FormGroup;
  conditionsForm!: FormGroup;
  workEnvForm!: FormGroup;

  isValveForm = true;
  isMaterialForm = false;
  isConditionsForm = false;
  isWorkEnvForm = false;

  tightnessList: string[];
  climateList: string[];

  postObj = {};
  constructor(private fb: FormBuilder, private httpService: ValveHttpService) { }

  ngOnInit(): void {
    this.getLists();
    //основная информация
    this.valveForm = this.fb.group({
      mark: [null, [Validators.required, Validators.maxLength(20)]],
      purpose: [null, [Validators.required, Validators.maxLength(150)]],
      typeDrive: [null, [Validators.required]],
    });
    //материал
    this.materialForm = this.fb.group({
      mainMaterial: [null, [Validators.required]],
      bodyMaterial: [null, [Validators.maxLength(50)]],
      capMaterial: [null, [Validators.maxLength(50)]],
      oilSealMaterial: [null, [Validators.maxLength(50)]],
      oilSealPackMaterial: [null, [Validators.maxLength(50)]],
      spindleMaterial: [null, [Validators.maxLength(50)]],
      sealerMaterial: [null, [Validators.maxLength(50)]],
      gasketMaterial: [null, [Validators.maxLength(50)]],
    });
    //условия эксплуатации
    this.conditionsForm = this.fb.group({
      tightnessClass: [null, [Validators.required]],
      operatingConditions: [null, [Validators.required]],
      warrantyOperation: [null, []],
      warrantyStorage: [null, []],
      warrantyTime: [null, []],
      conservation: [null, []],
    });
    //рабочая среда
    this.workEnvForm = this.fb.group({
      workEnv: [null, [Validators.required, Validators.maxLength(150)]],
      tWork: [null, [Validators.required]],
      tEnv: [null, [Validators.required]],
      pressure: [null, [Validators.required]],
    });
  }
  async getLists() {
    this.tightnessList = await this.httpService.getTightnessClass();
    this.climateList = await this.httpService.getClimateClass();
  }
  onAddValve() {
    const values = this.valveForm.value;

    this.postObj['mark'] = values.mark;
    this.postObj['purpose'] = values.purpose;
    this.postObj['typeDrive'] = values.typeDrive;

    this.isValveForm = false;
    this.isMaterialForm = true;
  }
  onAddMaterial() {
    const values = this.materialForm.value;

    this.postObj['mainMaterial'] = values.mainMaterial;
    this.postObj['bodyMaterial'] = values.bodyMaterial;
    this.postObj['capMaterial'] = values.capMaterial;
    this.postObj['oilSealMaterial'] = values.oilSealMaterial;
    this.postObj['oilSealPackMaterial'] = values.oilSealPackMaterial;
    this.postObj['spindleMaterial'] = values.spindleMaterial;
    this.postObj['sealerMaterial'] = values.sealerMaterial;
    this.postObj['gasketMaterial'] = values.gasketMaterial;

    this.isMaterialForm = false;
    this.isConditionsForm = true;
  }
  onAddConditions() {
    const values = this.conditionsForm.value;

    this.postObj['tightnessClass'] = values.tightnessClass;
    this.postObj['operatingConditions'] = values.operatingConditions;
    this.postObj['warrantyOperation'] = values.warrantyOperation;
    this.postObj['warrantyStorage'] = values.warrantyStorage;
    this.postObj['warrantyTime'] = values.warrantyTime;
    this.postObj['conservation'] = values.conservation;

    this.isConditionsForm = false;
    this.isWorkEnvForm = true;
  }
  onAddWorkEnv() {
    const values = this.workEnvForm.value;

    this.postObj['workEnv'] = values.workEnv;
    this.postObj['tWork'] = values.tWork;
    this.postObj['tEnv'] = values.tEnv;
    this.postObj['pressure'] = values.pressure;

    this.httpService.postValve(this.postObj);
  }
}
