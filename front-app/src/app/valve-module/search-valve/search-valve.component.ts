import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-valve',
  templateUrl: './search-valve.component.html',
  styleUrls: ['./search-valve.component.css']
})
export class SearchValveComponent implements OnInit {
  searchForm!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      mark: ['', [Validators.required]]
    })
  }
  onSearch() {
    console.log(23);
  }
}
