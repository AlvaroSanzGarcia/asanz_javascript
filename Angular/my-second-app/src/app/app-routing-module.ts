import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { App } from './app';
import { About } from './about/about';
import { Calculator } from './calculator/calculator';
import { Home } from './home/home';
import { Accounts } from './accounts/accounts'

const routes: Routes = [
  { path: '', component:Home },
  { path: 'about', component:About },
  { path: 'calculator', component:Calculator },
  { path: 'accounts', component:Accounts }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
