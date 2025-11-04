import { Component } from '@angular/core';
import { AccountsService } from '../shared/accounts.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(public accountsService: AccountsService) { }
}