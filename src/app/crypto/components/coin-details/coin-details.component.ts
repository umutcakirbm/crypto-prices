import { Component, Input, OnInit } from '@angular/core';

import { Coin } from '../../models/coin';

@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.scss']
})
export class CoinDetailsComponent implements OnInit {
  @Input() coin: Coin | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
