import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ValveModuleRoutingModule } from './valve-module-routing.module';
import { ValveListComponent } from './valve-list/valve-list.component';
import { AddValveComponent } from './add-valve/add-valve.component';
import { ValvePageComponent } from './valve-page/valve-page.component';
import { ValveCardComponent } from './valve-card/valve-card.component';
import { LoaderComponent } from '../shared/loader/loader.component';


@NgModule({
  declarations: [
    ValveListComponent,
    AddValveComponent,
    ValvePageComponent,
    ValveCardComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    ValveModuleRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ValveModuleModule { }
