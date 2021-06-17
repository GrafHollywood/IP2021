import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-valve-filter',
  templateUrl: './valve-filter.component.html',
  styleUrls: ['./valve-filter.component.css']
})
export class ValveFilterComponent implements OnInit {
  @Output() onFilter = new EventEmitter();
  @Output() onReset = new EventEmitter();
  filterForm!: FormGroup;
  PN: number;
  DN: number;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      DN: [0, []],
      PN: [0, []],
      material: [null, []],
    });
    this.PN = this.filterForm.value.PN;
    this.DN = this.filterForm.value.DN;
  }
  onInputPN() {
    this.PN = this.filterForm.value.PN;
  }
  onInputDN() {
    this.DN = this.filterForm.value.DN;
  }
  onFilterValve() {
    this.onFilter.emit(this.filterForm.value);
  }
  onResetValve() {
    this.filterForm.reset();
    this.onReset.emit();
  }
}
