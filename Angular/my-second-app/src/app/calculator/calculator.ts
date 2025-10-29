import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  standalone: false,
  templateUrl: './calculator.html',
  styleUrl: './calculator.css',
})
export class Calculator {
  billInput = 0;
  tipInput = 0;
  peopleInput = 1;

  totalBill: number;
  totalTip: number;
  totalPerPerson: number;

  totalBillFormatted: string;
  totalTipFormatted: string;
  totalPerPersonFormatted: string;

  calculateTip() {

    this.totalTip = this.billInput * this.tipInput;
    this.totalBill = this.billInput + this.totalTip;
    this.totalPerPerson = this.totalBill / this.peopleInput;


    this.totalBillFormatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(this.totalBill);

    this.totalTipFormatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(this.totalTip);

    this.totalPerPersonFormatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(this.totalPerPerson);

  }

}