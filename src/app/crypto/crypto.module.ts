import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

import { CryptoRoutingModule } from './crypto-routing.module';
import { ViewComponent } from './pages/view/view.component';
import { CoreModule } from '../core/core.module';
import { CoinListComponent } from './components/coin-list/coin-list.component';
import { CoinDetailsComponent } from './components/coin-details/coin-details.component';
import { CurrencySelectComponent } from './components/currency-select/currency-select.component';


@NgModule({
  declarations: [
    ViewComponent,
    CoinListComponent,
    CoinDetailsComponent,
    CurrencySelectComponent
  ],
  imports: [
    CommonModule,
    CryptoRoutingModule,
    CoreModule,
    ScrollingModule,
    NzListModule,
    NzSkeletonModule,
    NzSelectModule,
    NzStatisticModule,
  ]
})
export class CryptoModule { }
