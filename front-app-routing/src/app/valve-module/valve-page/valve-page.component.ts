import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ValveFull } from '../../shared/interfaces/valve.interface';
import { ValveHttpService } from '../../shared/services/valve-http.service';

@Component({
  selector: 'app-valve-page',
  templateUrl: './valve-page.component.html',
  styleUrls: ['./valve-page.component.css']
})
export class ValvePageComponent implements OnInit {
  valve!: ValveFull;
  mark: string;
  constructor(private route: ActivatedRoute, private httpService: ValveHttpService) {
    this.route.params.subscribe(param => {
      this.mark = param.id;
    });
  }

  ngOnInit(): void {
    this.getValve();
  }
  async getValve() {
    this.valve = await this.httpService.getValveByMark(this.mark);
  }
}
