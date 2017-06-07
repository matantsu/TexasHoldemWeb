import { Routes } from "@angular/router";
import { PageNotFoundComponent } from "app/page-not-found.component";
import { LoginPageComponent } from "app/login-page.component";
import { HomePageComponent } from "app/home-page.component";

export const appRoutes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];