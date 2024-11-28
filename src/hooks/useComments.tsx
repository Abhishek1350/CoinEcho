import { useState, useEffect } from "react";
import { useAuth } from "@/context";
import { supabase } from "@/lib/supabase";
import { User } from "@/lib/types";

export interface Comment {
    id: string;
    user: Pick<User, "name" | "profile_pic">;
    text: string;
    created_at: string;
}

export function useComments({ coinId }: { coinId: string }) {
    const { user } = useAuth();
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    async function addComment(text: string) {
        if (!user || !coinId) return;
        setIsLoading(true);
        try {
            const { error, data } = await supabase
                .from("comments")
                .insert({ user: user.id, item_id: coinId, text })
                .select("*, user(name, profile_pic)");
                
            if (error) throw new Error(error.message);

            setComments((prev) => [...data, ...prev]);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    }


    useEffect(() => {
        (async function () {
            if (!coinId) return;
            setIsLoading(true);
            try {
                const { data, error } = await supabase
                    .from("comments")
                    .select("*, user(name, profile_pic)")
                    .eq("item_id", coinId)
                    .order("created_at", { ascending: false });

                if (error) throw new Error();

                setComments(data);
            } catch (error) {
                console.error(error);
            }
            setIsLoading(false);
        })();
    }, [coinId]);

    return { comments, isLoading, addComment };
}
