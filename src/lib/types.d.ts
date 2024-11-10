export interface CurrencyFilter {
    uuid: string;
    iconUrl: string;
    name: string;
    symbol: string;
    sign: string;
}

export interface SortingFilter {
    label: string;
    value: string;
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

export interface StatsCoin {
    uuid: string;
    symbol: string;
    name: string;
    iconUrl: string;
    coinrankingUrl: string;
}

export interface GlobalStats {
    totalCoins: number;
    totalMarkets: number;
    totalExchanges: number;
    totalMarketCap: string;
    total24hVolume: string;
    btcDominance: number;
    bestCoins: StatsCoin[];
    newestCoins: StatsCoin[];
}

export interface GlobalStatsResponse {
    status: string;
    data: GlobalStats;
}

export interface CoinsResponse {
    status: string;
    data: {
        coins: ListsCoin[];
    };
}

export interface CoinDetailsResponse {
    status: string;
    data: {
        coin: Coin;
    };
}

export interface News {
    url: string;
    title: string;
    description: string;
    thumbnail: string;
    createdAt: string;
}

export interface NewsResponse {
    data: News[];
}

export interface User {
    id: string;
    name: string;
    email: string;
    profile_pic: string | null;
}
