import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Coin } from '../../models/coin';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss'],
})
export class CoinListComponent implements OnInit {
  @Input() dataSource: DataSource<Coin> | undefined;
  @Input() hasError: boolean = false;
  @Output() handleSelectCoin = new EventEmitter<Coin>();
  pageSize = 60;

  constructor() {}

  ngOnInit(): void {}

  selectCoin(coin: Coin): void {
    this.handleSelectCoin.emit(coin);
  }
}
