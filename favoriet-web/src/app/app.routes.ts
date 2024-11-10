import { Routes } from '@angular/router';
import { HomeComponent } from './favorieten/home/home.component';

export const routes: Routes = [
  { path: 'favorieten/home', component: HomeComponent },
  { path: 'favorieten', redirectTo: 'favorieten/home', pathMatch: 'full' },
  { path: '', redirectTo: 'favorieten/home', pathMatch: 'full' },
];
