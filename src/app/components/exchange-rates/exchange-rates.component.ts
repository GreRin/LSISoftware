import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import { onDateValidation } from '../../shared/helpers';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.scss']
})
export class ExchangeRatesComponent implements OnInit {
  public resetFilters: boolean = false;
  public formDate: FormGroup;
  public currentDate: string;

  constructor(
  ) {
    this.formDate = new FormGroup({
      date: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  public handleFilters(): void {
    this.resetFilters = !this.resetFilters;
  }

  public onFormSubmit():void {
    if (this.formDate.invalid) {
      return;
    }
    this.currentDate = onDateValidation(this.formDate.value.date);
  }

  public handeDate(event: any): void {
    this.currentDate = onDateValidation(event.target.value);
  }
}
