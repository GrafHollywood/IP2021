import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ValveListComponent } from './valve-list/valve-list.component';
import { MainComponent } from './main/main.component';
import { AddValveComponent } from './add-valve/add-valve.component';
import { AddExecutionComponent } from './add-execution/add-execution.component';
import { ValveCardComponent } from './valve-card/valve-card.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ValveListComponent,
    MainComponent,
    AddValveComponent,
    AddExecutionComponent,
    ValveCardComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
