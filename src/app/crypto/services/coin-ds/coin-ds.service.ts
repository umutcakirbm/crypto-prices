import { Injectable } from '@angular/core';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import {
  BehaviorSubject,
  catchError,
  interval,
  map,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';

import { Coin } from '../../models/coin';
import { CoinService } from '../coin/coin.service';
import { CoinListOrderType } from '../../enums/coin-list-order-type';

@Injectable()
export class CoinDsService extends DataSource<Coin> {
  private pageSize = 60;
  private currency = '';
  private cachedData: Coin[] = [];
  private fetchedPages = new Set<number>();
  private currentPages = [0, 1, 2];
  private dataStream = new BehaviorSubject<Coin[]>(this.cachedData);
  private currency$ = new Subject<string>();
  private complete$ = new Subject<void>();
  private disconnect$ = new Subject<void>();
  private collectionViewer: CollectionViewer | undefined;
  private hasError$ = new Subject<boolean>();
  private selectedCoin: string = '';

  constructor(private coinService: CoinService) {
    super();
  }

  createDataSource({
    currency,
    pageSize,
  }: {
    currency: string;
    pageSize: number;
  }): DataSource<Coin> {
    this.pageSize = pageSize;
    this.setCurrency(currency);
    return this;
  }

  completed(): Observable<void> {
    return this.complete$.asObservable();
  }

  hasError(): Observable<boolean> {
    return this.hasError$.asObservable();
  }

  connect(collectionViewer: CollectionViewer): Observable<Coin[]> {
    this.collectionViewer = collectionViewer;
    this.setup();
    return this.dataStream;
  }

  disconnect(): void {
    this.disconnect$.next();
    this.disconnect$.complete();
  }

  setCurrency(currency: string): void {
    this.currency = currency;
    this.currency$.next(currency);
  }

  getSelectedCoin(): Observable<Coin> {
    return this.dataStream
      .asObservable()
      .pipe(
        map((list) => list.find((item) => item.id === this.selectedCoin) as Coin)
      );
  }

  selectCoin(coin: Coin): void {
    this.selectedCoin = coin.id;
    this.dataStream.next(this.cachedData);
  }

  private reset(): void {
    this.cachedData = [];
    this.fetchedPages = new Set<number>();
    this.currentPages = [0, 1, 2];
    this.dataStream.next(this.cachedData);
    this.fetchPage(1);
  }

  private setup(): void {
    this.fetchPage(1);
    this.listenCollectionViewer(this.collectionViewer as CollectionViewer);
    this.listenTimer();
    this.listenCurrency();
  }

  private listenCollectionViewer(collectionViewer: CollectionViewer): void {
    collectionViewer.viewChange
      .pipe(takeUntil(this.complete$), takeUntil(this.disconnect$))
      .subscribe((range) => {
        const endPage = this.getPageForIndex(range.end);
        this.fetchPage(endPage + 1);
      });
  }

  private listenTimer(): void {
    interval(10000)
      .pipe(takeUntil(this.disconnect$))
      .subscribe(() => {
        this.currentPages.forEach((page) => this.fetchPage(page, true));
      });
  }

  private listenCurrency(): void {
    this.currency$
      .asObservable()
      .pipe(takeUntil(this.disconnect$))
      .subscribe(() => {
        this.reset();
      });
  }

  private getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize);
  }

  private fetchPage(page: number, manuelTrigger?: boolean): void {
    if (!manuelTrigger) {
      if (page === 0) {
        this.currentPages = [0, 1, 2];
      } else {
        this.currentPages = [page - 1, page, page + 1];
      }
      if (this.fetchedPages.has(page)) {
        return;
      }
      this.fetchedPages.add(page);
    }

    this.coinService
      .getAllCoinsByCurrency({
        currency: this.currency,
        order: CoinListOrderType.MARKET_CAP_DESC,
        pageSize: this.pageSize,
        pageNumber: page,
      })
      .pipe(
        catchError(() => {
          this.hasError$.next(true);
          throw new Error();
        })
      )
      .subscribe((res) => {
        const results = [...(res as Coin[])];
        if (results.length < this.pageSize) {
          this.complete$.next();
          this.complete$.complete();
        }
        this.cachedData.splice(
          page * this.pageSize,
          this.pageSize,
          ...(res as Coin[]).map((item) => ({
            ...item,
            currency: this.currency,
          }))
        );
        this.dataStream.next(this.cachedData);
        if (this.cachedData.length) {
          this.hasError$.next(false);
        }
      });
  }
}
