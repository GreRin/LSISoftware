import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import {
  IExchangeRateData,
  Rate
} from "../../../backend-bridge/controllers/exchange-rates/interface/exchange-rate-interface";
import { ExchangeRatesService } from "../../../backend-bridge/controllers/exchange-rates/service/exchange-rates.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public exchangeRatesDataList$: Subscription = new Subscription();
  public exchangeRatesData: Rate[] = [];
  displayedColumns: string[] = ['Symbol waluty', 'Waluta', 'Kurs waluty'];

  constructor(
    private exchangeRatesService: ExchangeRatesService,
  ) { }

  ngOnInit(): void {
    this.exchangeRatesDataList$ = this.exchangeRatesService.getExchangeRatesData()
      .subscribe((data: IExchangeRateData[]) => {
        console.log(data)
        this.exchangeRatesData = data[0].rates;
      });
  }

  ngOnDestroy() {
    this.exchangeRatesDataList$.unsubscribe();
  }
}
