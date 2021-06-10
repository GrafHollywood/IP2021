import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExecutionComponent } from './add-execution/add-execution.component';
import { AddValveComponent } from './add-valve/add-valve.component';
import { MainComponent } from './main/main.component';
import { ValveListComponent } from './valve-list/valve-list.component';
import { ValvePageComponent } from './valve-page/valve-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'valve',
    component: ValveListComponent
  },
  {
    path: 'valve/add',
    component: AddValveComponent
  },
  {
    path: 'valve/:id',
    component: ValvePageComponent
  },
  {
    path: 'execution/add',
    component: AddExecutionComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
