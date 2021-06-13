import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddValveComponent } from './add-valve/add-valve.component';
import { ValveListComponent } from './valve-list/valve-list.component';
import { ValvePageComponent } from './valve-page/valve-page.component';

const routes: Routes = [
  {
    path: '',
    component: ValveListComponent
  },
  {
    path:'add',
    component: AddValveComponent
  },
  {
    path: ':id',
    component: ValvePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValveModuleRoutingModule { }
