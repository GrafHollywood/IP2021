import { Component, Input, OnInit } from '@angular/core';
import { ValveShort } from '../../shared/interfaces/valve.interface';

@Component({
  selector: 'app-valve-card',
  templateUrl: './valve-card.component.html',
  styleUrls: ['./valve-card.component.css']
})
export class ValveCardComponent implements OnInit {
  @Input() valve: ValveShort;
  constructor() { }

  ngOnInit(): void {
  }

}
