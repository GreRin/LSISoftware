import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IExchangeRateData} from "../interface/exchange-rate-interface";

@Injectable({
  providedIn: 'root'
})
export class ExchangeRatesService {

  private constructor(private http: HttpClient) {
  }

  getExchangeRatesData(): Observable<IExchangeRateData[]> {
    let url = `https://api.nbp.pl/api/exchangerates/tables/A/?format=json`;
    return this.http.get<IExchangeRateData[]>(url);
  }
}
