import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { About } from './about/about';
import { Calculator } from './calculator/calculator';
import { Home } from './home/home';
import { Accounts } from './accounts/accounts';

@NgModule({
  declarations: [
    App,
    Header,
    Footer,
    About,
    Calculator,
    Home,
    Accounts
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
