import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ValveCardComponent } from './valve-card/valve-card.component';
import { ValveAddFormComponent } from './valve-add-form/valve-add-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ValveCardComponent,
    ValveAddFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
