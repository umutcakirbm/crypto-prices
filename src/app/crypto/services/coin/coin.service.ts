import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import { Currency, CurrencyListResponse } from '../../models/currency';
import { Coin, CoinListQuery, CoinListResponse } from '../../models/coin';

@Injectable({
  providedIn: 'root',
})
export class CoinService {
  constructor(private http: HttpClient) {}

  getAllCurrencies(): Observable<Currency[]> {
    return this.http
      .get<CurrencyListResponse>(`${environment.currencyApiBaseUri}/currencies`)
      .pipe(map((response) => response.data));
  }

  getAllCoinsByCurrency({
    currency,
    order,
    pageSize,
    pageNumber,
  }: CoinListQuery): Observable<Coin[]> {
    return this.http
      .get<CoinListResponse>(`${environment.cryptoApiBaseUri}/coins/markets`, {
        params: {
          vs_currency: currency,
          order,
          per_page: pageSize,
          page: pageNumber,
        },
      })
      .pipe(map((response) => response.data));
  }
}
