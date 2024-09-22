import { useQuery, UseQueryResult } from "@tanstack/react-query";
import Api from "./api";
import {
    CoinsResponse,
    GlobalStatsResponse,
    CoinDetailsResponse,
    NewsResponse,
} from "./types";

const REFETCH__INTERVAl = (time: number) => 1000 * 60 * time;

function useBaseQuery<T>(
    queryKey: any[],
    queryFn: () => Promise<T>,
    refetchInterval?: number
): UseQueryResult<T> {
    return useQuery({
        queryKey,
        queryFn,
        refetchInterval,
        retry: 1,
    });
}

export const useGlobalStats = (
    params: { referenceCurrencyUuid?: string } = {}
) => {
    return useBaseQuery<GlobalStatsResponse>(
        ["globalStats", params],
        () => Api.getGlobalStats(params),
        REFETCH__INTERVAl(2)
    );
};

export const useAllCoins = (
    params: {
        referenceCurrencyUuid?: string;
        timePeriod?: string;
        limit?: number;
        offset?: number;
        orderBy?: string;
        orderDirection?: string;
    } = {}
) => {
    return useBaseQuery<CoinsResponse>(
        ["coins", params],
        () => Api.getAllCoins(params),
        REFETCH__INTERVAl(1)
    );
};

export const useCoinDetails = (
    coinId: string,
    params: {
        referenceCurrencyUuid?: string;
        timePeriod?: string;
    } = {}
) => {
    return useBaseQuery<CoinDetailsResponse>(
        ["coinDetail", coinId, params],
        () => Api.getCoinDetails(coinId, params),
        REFETCH__INTERVAl(1)
    );
};

export const useNews = (provider: string) => {
    return useBaseQuery<NewsResponse>(
        ["news", provider],
        () => Api.getNews(provider),
        REFETCH__INTERVAl(2)
    );
};
