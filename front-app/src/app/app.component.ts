import { Component, OnInit } from '@angular/core';
import { Valve } from './share/interfaces/valve.interface';
import { HttpDbService } from './share/services/http-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // valve: Valve = { name: 'init', mainMaterial: 'сталь' };
  constructor(private http: HttpDbService) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.getValveList();
    // console.log(this.valve);
  }

  // async getValveList() {
  //   try {
  //     this.valve = await this.http.getValveList();
  //     console.log(this.valve)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
