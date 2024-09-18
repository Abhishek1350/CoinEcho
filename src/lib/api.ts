import {
    cryptoApiBaseUrl,
    cryptoApiHost,
    newsApiBaseUrl,
    newsApiHost,
    rapidApiKey,
} from "@/config/env";
import {
    CoinsResponse,
    GlobalStatsResponse,
    CoinDetailsResponse,
    NewsResponse,
} from "./types";
import { buildUrlWithParams } from "./utils";

class Api {
    private static prepareHeaders(type: "coins" | "news"): HeadersInit {
        const host = type === "coins" ? cryptoApiHost : newsApiHost;
        return {
            "X-RapidAPI-Host": host,
            "X-RapidAPI-Key": rapidApiKey,
        };
    }

    private static async fetchJson<T>(
        url: string,
        type: "coins" | "news"
    ): Promise<T> {
        const headers = this.prepareHeaders(type);
        const response = await fetch(url, { method: "GET", headers });
        if (!response.ok) {
            throw new Error(`Failed to fetch from ${url}: ${response.statusText}`);
        }
        return response.json();
    }

    public static getGlobalStats(
        params: {
            referenceCurrencyUuid?: string;
        } = {}
    ): Promise<GlobalStatsResponse> {
        const url = buildUrlWithParams(`${cryptoApiBaseUrl}/stats`, params);
        return this.fetchJson<GlobalStatsResponse>(url, "coins");
    }

    public static getAllCoins(
        params: {
            referenceCurrencyUuid?: string;
            timePeriod?: string;
            limit?: number;
            offset?: number;
            orderBy?: string;
            orderDirection?: string;
        } = {}
    ): Promise<CoinsResponse> {
        const url = buildUrlWithParams(`${cryptoApiBaseUrl}/coins`, params);
        return this.fetchJson<CoinsResponse>(url, "coins");
    }

    public static searchCoins(params: {
        search: string;
        referenceCurrencyUuid?: string;
        limit?: number;
    }): Promise<CoinsResponse> {
        const url = buildUrlWithParams(`${cryptoApiBaseUrl}/coins`, params);
        return this.fetchJson<CoinsResponse>(url, "coins");
    }

    public static getCoinDetails(
        coinId: string,
        params: {
            referenceCurrencyUuid?: string;
            timePeriod?: string;
        } = {}
    ): Promise<CoinDetailsResponse> {
        const url = buildUrlWithParams(`${cryptoApiBaseUrl}/coin/${coinId}`, params);
        return this.fetchJson<CoinDetailsResponse>(url, "coins");
    }

    public static getNews(provider: string): Promise<NewsResponse> {
        const url = `${newsApiBaseUrl}/${provider}`;
        return this.fetchJson<NewsResponse>(url, "news");
    }
}

export default Api;
