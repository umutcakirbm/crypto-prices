export interface Currency {
  id: string;
  name: string;
  minSize: string;
}

export interface CurrencyListResponse {
  data: Currency[];
}
