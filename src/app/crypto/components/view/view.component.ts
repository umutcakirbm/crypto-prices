import { Component, OnInit } from '@angular/core';

import { CoinService } from '../../services/coin/coin.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  constructor(private coinService: CoinService) {}

  ngOnInit(): void {}
}
