import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValveFull } from 'src/app/shared/interfaces/valve.interface';
import { ValveHttpService } from 'src/app/shared/services/valve-http.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  mark: string;
  valve: ValveFull;
  valveForm!: FormGroup;
  materialForm!: FormGroup;
  conditionsForm!: FormGroup;
  workEnvForm!: FormGroup;
  docForm!: FormGroup;

  tightnessList: string[];
  climateList: string[];

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private httpService: ValveHttpService, private router: Router) {
    this.route.params.subscribe(param => {
      this.mark = param.mark;
    });
    this.getValve();
  }

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
      tEnvMax: [null, [Validators.required]],
      tEnvMin: [null, [Validators.required]],
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

  async getValve() {
    this.valve = await this.httpService.getValveByMark(this.mark);
    this.valveForm.setValue({
      mark: this.valve.Model,
      purpose: this.valve.Purpose,
      typeDrive: this.valve.Type_drive,
    });
    this.materialForm.setValue({
      mainMaterial: this.valve.Main_Material,
      bodyMaterial: this.valve.Body_Material,
      capMaterial: this.valve.Cap_Material,
      oilSealMaterial: this.valve.OilSeal_Material,
      oilSealPackMaterial: this.valve.OilSealPack_Material,
      spindleMaterial: this.valve.Spindle_Material,
      sealerMaterial: this.valve.Sealer_Material,
      gasketMaterial: this.valve.Gasket_Material,
    });
    this.conditionsForm.setValue({
      tightnessClass: this.valve.tightness_class,
      operatingConditions: this.valve.climate_conditions,
      warrantyOperation: this.valve.warranty_operation,
      warrantyStorage: this.valve.warranty_storage,
      warrantyTime: this.valve.warranty_time,
      conservation: this.valve.conservation,
    });
    this.workEnvForm.setValue({
      workEnv: this.valve.Work_Enviroment,
      tWorkMax: this.valve.t_work_env_max,
      tWorkMin: this.valve.t_work_env_min,
      tEnvMax: this.valve.t_env_max,
      tEnvMin: this.valve.t_env_min,
      pressure: this.valve.Pressure,
    });
    this.docForm.setValue({
      img: this.valve.img,
    });
  }

  async editValve() {
    const values = Object.assign(this.valveForm.value, this.materialForm.value, this.conditionsForm.value, this.workEnvForm.value, this.docForm.value);
    try {
      await this.httpService.updateValveByMark(this.mark, values)
    } catch (error) {
      console.log(error);
    }
    this.router.navigateByUrl(`valve/${values.mark}`);
  }
}
