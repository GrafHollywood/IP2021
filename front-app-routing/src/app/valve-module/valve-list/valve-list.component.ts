import { Component, OnInit } from '@angular/core';
import { ValveShort } from '../../shared/interfaces/valve.interface';
import { ValveHttpService } from '../../shared/services/valve-http.service';

@Component({
  selector: 'app-valve-list',
  templateUrl: './valve-list.component.html',
  styleUrls: ['./valve-list.component.css']
})
export class ValveListComponent implements OnInit {
  valveList: ValveShort[];
  constructor(private httpValve: ValveHttpService) { }

  ngOnInit(): void {
    this.getValveList();
  }
  async getValveList() {
    this.valveList = await this.httpValve.getValves();
  }
}
