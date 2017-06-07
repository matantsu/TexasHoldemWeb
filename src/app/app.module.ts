import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './nav.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { LoginPageComponent } from './login-page.component';
import { appRoutes } from "app/routes";
import { BLModule } from "app/bl/bl.module";
import { HomePageComponent } from './home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PageNotFoundComponent,
    LoginPageComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    BLModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
