import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { map, Observable, tap } from 'rxjs';

import { CoinDsService } from '../../services/coin-ds/coin-ds.service';
import { CoinService } from '../../services/coin/coin.service';
import { Coin } from '../../models/coin';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [CoinDsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewComponent implements OnInit {
  currencies$: Observable<string[]>;
  selectedCurrency: string = 'USD';
  selectedCoin$: Observable<Coin>;
  pageSize = 60;
  dataSource: DataSource<Coin>;
  hasError$: Observable<boolean>;

  constructor(
    private coinDsService: CoinDsService,
    private coinService: CoinService
  ) {
    this.currencies$ = this.coinService
      .getAllCurrencies()
      .pipe(map((list) => list.map((item) => item.id)));
    this.dataSource = this.coinDsService.createDataSource({
      currency: this.selectedCurrency,
      pageSize: this.pageSize,
    });
    this.selectedCoin$ = this.coinDsService.getSelectedCoin();
    this.hasError$ = this.coinDsService.hasError();
  }

  ngOnInit(): void {}

  handleCurrencyChange(currency: string): void {
    this.selectedCurrency = currency;
    this.coinDsService.setCurrency(this.selectedCurrency);
  }

  handleSelectCoin(coin: Coin): void {
    this.coinDsService.selectCoin(coin);
  }
}
