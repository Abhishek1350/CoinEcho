import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cryptoApiBaseUrl, cryptoApiHost, rapidApiKey } from "@/config/env";

const API_HEADERS = {
    "x-rapidapi-host": cryptoApiHost,
    "x-rapidapi-key": rapidApiKey,
};

const createApiRequest = (url: string) => ({
    url,
    headers: API_HEADERS,
});

export const coinsApi = createApi({
    reducerPath: "coinsApi",
    baseQuery: fetchBaseQuery({ baseUrl: cryptoApiBaseUrl }),
    endpoints: (builder) => ({
        getAllCoins: builder.query({
            query: (limit: number = 50) => createApiRequest(`/coins?limit=${limit}`),
        }),

        getCoinDetails: builder.query({
            query: (id: string) => createApiRequest(`/coin/${id}`),
        }),
    }),
});

export const { useGetAllCoinsQuery, useGetCoinDetailsQuery } = coinsApi;
