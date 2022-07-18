import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-currency-select',
  templateUrl: './currency-select.component.html',
  styleUrls: ['./currency-select.component.scss']
})
export class CurrencySelectComponent implements OnInit {
  @Input() currency = '';
  @Input() currencies: string[] = [];
  @Output() currencyChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  changeCurrency(currency: string): void {
    this.currencyChange.emit(currency);
  }

}
