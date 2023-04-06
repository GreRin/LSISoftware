import {Component, OnInit} from '@angular/core';
import {ExchangeRatesService} from "../../backend-bridge/controllers/exchange-rates/service/exchange-rates.service";
import * as buffer from "buffer";

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.scss']
})
export class ExchangeRatesComponent implements OnInit {
  public resetFilters: boolean = false;

  constructor(
    private exchangeRatesService: ExchangeRatesService,
  ) { }

  ngOnInit(): void {

  }

  public handleFilters() {
    this.resetFilters = !this.resetFilters;
  }

}
