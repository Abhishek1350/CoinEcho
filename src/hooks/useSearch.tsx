import { useState, useEffect } from "react";
import Api from "@/lib/api";
import { ListsCoin } from "@/lib/types";

export function useSearch({ query }: { query: string }) {
    const [data, setData] = useState<ListsCoin[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        (async function () {
            try {
                if (!query.trim()) return;
                setIsLoading(true);
                setError(false);
                const response = await Api.searchCoins({ search: query });
                if (!response || !response?.data?.coins) throw new Error();
                setData(response.data.coins);
            } catch (error) {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [query]);

    return { data, isLoading, error };
}