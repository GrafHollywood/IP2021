import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  docForm!: FormGroup;

  tightnessList: string[];
  climateList: string[];

  postObj = {};
  constructor(private fb: FormBuilder, private httpService: ValveHttpService, private router: Router) { }

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
      tWorkMax: [null, []],
      tWorkMin: [null, []],
      tEnvMax: [null, []],
      tEnvMin: [null, []],
      pressure: [null, [Validators.required]],
    });
    //документы
    this.docForm = this.fb.group({
      img: [null, [Validators.required]]
    })
  }
  async getLists() {
    this.tightnessList = await this.httpService.getTightnessClass();
    this.climateList = await this.httpService.getClimateClass();
  }
  addValve() {
    // const values = this.valveForm.value;
    const values = Object.assign(this.valveForm.value, this.materialForm.value, this.conditionsForm.value, this.workEnvForm.value, this.docForm.value);
    this.postObj['mark'] = values.mark;
    this.postObj['purpose'] = values.purpose;
    this.postObj['typeDrive'] = values.typeDrive;

    this.postObj['mainMaterial'] = values.mainMaterial;
    this.postObj['bodyMaterial'] = values.bodyMaterial;
    this.postObj['capMaterial'] = values.capMaterial;
    this.postObj['oilSealMaterial'] = values.oilSealMaterial;
    this.postObj['oilSealPackMaterial'] = values.oilSealPackMaterial;
    this.postObj['spindleMaterial'] = values.spindleMaterial;
    this.postObj['sealerMaterial'] = values.sealerMaterial;
    this.postObj['gasketMaterial'] = values.gasketMaterial;

    this.postObj['tightnessClass'] = values.tightnessClass;
    this.postObj['operatingConditions'] = values.operatingConditions;
    this.postObj['warrantyOperation'] = values.warrantyOperation;
    this.postObj['warrantyStorage'] = values.warrantyStorage;
    this.postObj['warrantyTime'] = values.warrantyTime;
    this.postObj['conservation'] = values.conservation;

    this.postObj['workEnv'] = values.workEnv;
    this.postObj['tWorkMin'] = values.tWorkMin;
    this.postObj['tWorkMax'] = values.tWorkMax;
    this.postObj['tEnvMin'] = values.tEnvMin;
    this.postObj['tEnvMax'] = values.tEnvMax;
    this.postObj['pressure'] = values.pressure;

    this.postObj['img'] = values.img;

    this.httpService.postValve(this.postObj);

    this.router.navigateByUrl(`valve/${values.mark}`);
  }
}
