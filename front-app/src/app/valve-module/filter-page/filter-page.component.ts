import { Component, OnInit } from '@angular/core';
import { FilterValve } from 'src/app/shared/interfaces/filter.interface';
import { ValveShort } from 'src/app/shared/interfaces/valve.interface';
import { FilterService } from 'src/app/shared/services/filter.service';

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.css']
})
export class FilterPageComponent implements OnInit {
  valveList: ValveShort[] = [];
  constructor(private httpFilter: FilterService) { }

  ngOnInit(): void {
  }
  async onFilter(filter: FilterValve) {
    this.valveList = await this.httpFilter.getFilterValve(filter);
  }
}
