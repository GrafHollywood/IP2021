import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExecutionComponent } from './add-execution/add-execution.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'valve',
    loadChildren: () => import('./valve-module/valve-module.module').then(m => m.ValveModuleModule)
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
