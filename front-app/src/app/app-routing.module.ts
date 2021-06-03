import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ValveAddFormComponent } from './valve-add-form/valve-add-form.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'add',
    component: ValveAddFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
