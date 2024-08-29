import {
    cryptoApiBaseUrl,
    cryptoApiHost,
    newsApiBaseUrl,
    newsApiHost,
    rapidApiKey,
} from "@/config/env";
import { CoinsResponse, News } from "./types";
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

    public static getAllCoins(
        params: {
            referenceCurrencyUuid?: string;
            timePeriod?: string;
            limit?: number;
            offset?: number;
        } = {}
    ): Promise<CoinsResponse> {
        const url = buildUrlWithParams(`${cryptoApiBaseUrl}/coins`, params);
        return this.fetchJson<CoinsResponse>(url, "coins");
    }

    public static getCoinDetails(
        coinId: string,
        params: {
            referenceCurrencyUuid?: string;
            timePeriod?: string;
        } = {}
    ): Promise<CoinsResponse> {
        const url = buildUrlWithParams(`${cryptoApiBaseUrl}/${coinId}`, params);
        return this.fetchJson<CoinsResponse>(url, "coins");
    }

    public static getNews(provider: string): Promise<News[]> {
        const url = `${newsApiBaseUrl}/${provider}`;
        return this.fetchJson<News[]>(url, "news");
    }
}

export default Api;
