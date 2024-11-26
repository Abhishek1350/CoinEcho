import { useState, useEffect } from "react";
import { useAuth, useAuthModal } from "@/context";
import { supabase } from "@/lib/supabase";

interface Likes {
    isLiked: boolean;
    count: number;
}

export function useLikes({ coinId }: { coinId: string }) {
    const { user } = useAuth();
    const [likes, setLikes] = useState<Likes>({ isLiked: false, count: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const { handleOpen: handleOpenAuthModal } = useAuthModal();

    async function updateLike() {
        if (!coinId || isLoading) return;

        if (!user) return handleOpenAuthModal();

        setIsLoading(true);

        setLikes((prev) => {
            return {
                ...prev,
                isLiked: !prev.isLiked,
                count: prev.isLiked ? prev.count - 1 : prev.count + 1,
            };
        });

        try {
            if (likes.isLiked) {
                await supabase.from("likes").delete().eq("item_id", coinId);
            } else {
                await supabase
                    .from("likes")
                    .insert({ user_id: user.id, item_id: coinId });
            }
        } catch (error) { }

        setIsLoading(false);
    }

    useEffect(() => {
        (async function () {
            if (!coinId) return;
            try {
                const { data, error } = await supabase
                    .from("likes")
                    .select("user_id")
                    .eq("item_id", coinId);

                if (error) throw new Error();
                const isLiked = data?.some((like) => like.user_id === user?.id);

                setLikes((prev) => {
                    return {
                        ...prev,
                        isLiked,
                        count: data?.length ?? 0,
                    };
                });
            } catch (error) {
                console.error(error);
            }
        })();
    }, [coinId, user]);

    return { likes, updateLike };
}
