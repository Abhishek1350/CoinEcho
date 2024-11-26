import { useState, useEffect } from "react";
import { useAuth } from "@/context";
import { supabase } from "@/lib/supabase";
import Api from "@/lib/api";
import { ListsCoin } from "@/lib/types";

export function useUserLikes() {
    const { user } = useAuth();
    const [userLikes, setUserLikes] = useState<ListsCoin[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async function () {
            if (!user || isLoading) return;
            setIsLoading(true);
            try {
                const { data, error } = await supabase
                    .from("likes")
                    .select("item_id")
                    .eq("user_id", user?.id);

                if (error) throw new Error();

                if (data?.length) {
                    const uuids = data.map((like) => like.item_id);
                    const coins = await Api.getCoinsByIds({ uuids });
                    setUserLikes(coins?.data?.coins);
                }
            } catch (error) {
                console.error(error);
            }
            setIsLoading(false);
        })();
    }, [user]);

    return { userLikes, isLoading };
}
