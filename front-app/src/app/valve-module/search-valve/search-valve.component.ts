import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValveShort } from 'src/app/shared/interfaces/valve.interface';
import { ValveHttpService } from 'src/app/shared/services/valve-http.service';

@Component({
  selector: 'app-search-valve',
  templateUrl: './search-valve.component.html',
  styleUrls: ['./search-valve.component.css']
})
export class SearchValveComponent implements OnInit {
  searchForm!: FormGroup;
  markList: string[];
  error: string;
  constructor(private fb: FormBuilder, private valveService: ValveHttpService, private router: Router) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      mark: ['', [Validators.required]]
    });
    this.getMarkList();
  }

  onSearch() {
    const mark = this.searchForm.value.mark;
    if (this.markList.includes(mark)) {
      this.router.navigateByUrl(`valve/${mark}`);
    } else {
      this.error = 'Не найдено'
    }
  }

  async getMarkList() {
    try {
      this.markList = await this.valveService.getValveList();
    } catch (error) {
      console.error(error);
    }
  }
}
