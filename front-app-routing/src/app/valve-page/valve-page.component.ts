import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-valve-page',
  templateUrl: './valve-page.component.html',
  styleUrls: ['./valve-page.component.css']
})
export class ValvePageComponent implements OnInit {
  mark: string;
  constructor(private route: ActivatedRoute) {
    route.params.subscribe(param => {
      this.mark = param.id;
    });
  }

  ngOnInit(): void {
  }

}
