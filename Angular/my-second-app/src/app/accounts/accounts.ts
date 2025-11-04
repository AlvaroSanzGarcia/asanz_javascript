import { Component } from '@angular/core';
import { AccountsService } from '../shared/accounts.service';
import { DUMMY_USERS } from '../dummy-users';

@Component({
  selector: 'app-accounts',
  standalone: false,
  templateUrl: './accounts.html',
  styleUrl: './accounts.css',
})
export class Accounts {
  constructor(public accountsService: AccountsService) {}
}
