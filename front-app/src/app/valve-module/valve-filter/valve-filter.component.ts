import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterValve } from 'src/app/shared/interfaces/filter.interface';
import { ValveHttpService } from 'src/app/shared/services/valve-http.service';

@Component({
  selector: 'app-valve-filter',
  templateUrl: './valve-filter.component.html',
  styleUrls: ['./valve-filter.component.css']
})
export class ValveFilterComponent implements OnInit {
  @Output() onFilter = new EventEmitter<FilterValve>()
  filterForm!: FormGroup;
  tightnessList: string[];
  climateList: string[];
  envList: string[];

  constructor(private fb: FormBuilder, private httpService: ValveHttpService) { }

  ngOnInit(): void {
    this.getLists();
    this.filterForm = this.fb.group({
      DN: [0, [Validators.required]],
      PN: [0, [Validators.required]],
      tEnw: [0, [Validators.required]],
      typeConnect: ['', [Validators.required]],
      classTightness: ['', [Validators.required]],
      climateCondition: ['', [Validators.required]],
      workEnv: ['', [Validators.required]],
      material: ['', [Validators.required]],
    });
  }
  async getLists() {
    this.tightnessList = await this.httpService.getTightnessClass();
    this.climateList = await this.httpService.getClimateClass();
    this.envList = await this.httpService.getWorkEnvList();
  }
  onFilterValve() {
    const values = this.filterForm.value;
    this.onFilter.emit(values);
  }
  onResetValve() {
    this.filterForm.reset();
  }
}
