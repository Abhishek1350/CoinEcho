export interface CurrencyFilter {
    uuid: string;
    iconUrl: string;
    name: string;
    symbol: string;
    sign: string;
}

export interface Link {
    name: string;
    url: string;
    type: string;
}

export interface Supply {
    confirmed: boolean;
    supplyAt?: number;
    max?: string;
    total: string;
    circulating: string;
}

export interface AllTimeHigh {
    price: string;
    timestamp: number;
}

export interface ListsCoin {
    uuid: string;
    symbol: string;
    name: string;
    color: string;
    iconUrl: string;
    marketCap: string;
    price: string;
    listedAt: number;
    tier: number;
    change: string;
    rank: number;
    sparkline: string[];
    lowVolume: boolean;
    coinrankingUrl: string;
    "24hVolume": string;
    btcPrice: string;
    contractAddresses: any[];
}

export interface Coin extends ListsCoin {
    description: string;
    websiteUrl: string;
    links: Link[];
    supply: Supply;
    numberOfMarkets: number;
    numberOfExchanges: number;
    fullyDilutedMarketCap: string;
    priceAt: number;
    allTimeHigh: AllTimeHigh;
    hasContent: boolean;
    notices: any;
    tags: string[];
}

export interface Stats {
    total: number;
    totalCoins: number;
    totalMarkets: number;
    totalExchanges: number;
    totalMarketCap: string;
    total24hVolume: string;
}

export interface CoinsResponse {
    status: string;
    data: {
        stats: Stats;
        coins: ListsCoin[];
    };
}

export interface News {
    url: string;
    title: string;
    description: string;
    thumbnail: string;
    createdAt: Date;
}
