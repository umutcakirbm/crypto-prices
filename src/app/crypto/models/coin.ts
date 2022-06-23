import { CoinListOrderType } from "../enums/coin-list-order-type";

interface CoinRoi {
  times: number;
  currency: string;
  percentage: number;
}

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  marketCap: number;
  marketCapRank: number;
  fullyDilutedValuation: number;
  totalVolume: number;
  high24h: number;
  low24h: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
  marketCapChange24h: number;
  marketCapChangePercentage24h: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number;
  ath: number;
  athChangePercentage: number;
  athDate: string;
  atl: number;
  atlChangePercentage: string;
  atlDate: string;
  roi?: CoinRoi;
  lastUpdated: string;
}

export interface CoinListQuery {
    currency: string;
    order: CoinListOrderType;
    pageSize: number;
    pageNumber: number;
}

export interface CoinListResponse {
    data: Coin[];
}