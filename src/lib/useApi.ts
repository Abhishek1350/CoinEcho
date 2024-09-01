import { useQuery, UseQueryResult } from "@tanstack/react-query";
import Api from "./api";
import {
    CoinsResponse,
    GlobalStatsResponse,
    CoinDetailsResponse,
    NewsResponse,
} from "./types";

function useBaseQuery<T>(
    queryKey: any[],
    queryFn: () => Promise<T>
): UseQueryResult<T> {
    return useQuery({
        queryKey,
        queryFn,
    });
}

export const useGlobalStats = (
    params: { referenceCurrencyUuid?: string } = {}
) => {
    return useBaseQuery<GlobalStatsResponse>(["globalStats", params], () =>
        Api.getGlobalStats(params)
    );
};

export const useAllCoins = (
    params: {
        referenceCurrencyUuid?: string;
        timePeriod?: string;
        limit?: number;
        offset?: number;
    } = {}
) => {
    return useBaseQuery<CoinsResponse>(["coins", params], () =>
        Api.getAllCoins(params)
    );
};

export const useCoinDetails = (
    coinId: string,
    params: {
        referenceCurrencyUuid?: string;
        timePeriod?: string;
    } = {}
) => {
    return useBaseQuery<CoinDetailsResponse>(["coinDetail", coinId, params], () =>
        Api.getCoinDetails(coinId, params)
    );
};

export const useNews = (provider: string) => {
    return useBaseQuery<NewsResponse>(["news", provider], () =>
        Api.getNews(provider)
    );
};
