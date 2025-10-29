import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { App } from './app';
import { About } from './about/about';
import { Calculator } from './calculator/calculator';
import { Home } from './home/home';

const routes: Routes = [
  { path: '', component:Home },
  { path: 'about', component:About },
  { path: 'calculator', component:Calculator }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
