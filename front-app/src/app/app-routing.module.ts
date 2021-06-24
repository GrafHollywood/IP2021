import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExecutionComponent } from './add-execution/add-execution.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'valve',
    loadChildren: () => import('./valve-module/valve-module.module').then(m => m.ValveModuleModule)
  },
  {
    path: 'execution/add',
    component: AddExecutionComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
