import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context";
import { supabase } from "@/lib/supabase";
import { User } from "@/lib/types";

export interface Comment {
    id: string;
    user: Pick<User, "name" | "profile_pic">;
    text: string;
    parent_id: string | null;
    created_at: string;
    replies?: Comment[];
}

function groupCommentsByParentId(comments: Comment[]): Comment[] {
    const commentMap: { [key: string]: Comment } = {}; // To store comments by their ID
    const groupedComments: Comment[] = [];

    // First, map all comments by their id and initialize replies array
    comments.forEach((comment) => {
        comment.replies = [];
        commentMap[comment.id] = comment;
    });

    // Now, group comments based on their parent_id
    comments.forEach((comment) => {
        if (comment.parent_id) {
            // If the comment has a parent, push it to the parent's replies array
            const parent = commentMap[comment.parent_id];
            if (parent) {
                parent.replies?.push(comment);
            }
        } else {
            // If it's a root comment (parent_id is null), add it to the top-level array
            groupedComments.push(comment);
        }
    });

    return groupedComments;
}

export function useComments({ coinId }: { coinId: string }) {
    const { user } = useAuth();
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const getComments = useCallback(async () => {
        if (!coinId) return;
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from("comments")
                .select("*, user(name, profile_pic)")
                .eq("item_id", coinId)
                .order("created_at", { ascending: false });

            if (error) throw new Error();
            setComments(() => groupCommentsByParentId(data));
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    }, [coinId]);

    const addComment = useCallback(
        async (text: string, parentId?: string | null) => {
            if (!user || !coinId) return;
            setIsLoading(true);
            try {
                const { error } = await supabase
                    .from("comments")
                    .insert({ user: user.id, item_id: coinId, text, parent_id: parentId })
                    .select("*, user(name, profile_pic)");

                if (error) throw new Error(error.message);

                await getComments();
            } catch (error) {
                console.error(error);
            }
            setIsLoading(false);
        },
        [coinId, user]
    );

    useEffect(() => {
        getComments();
    }, [getComments]);

    return { comments, isLoading, addComment };
}
