import { useAuthModal } from "@/context";
import { User } from "@/lib/types";
import { Group, Avatar, Textarea, Button } from "@mantine/core";
import { useState } from "react";

interface CommentFormProps {
    user?: Pick<User, "name" | "profile_pic"> | null;
    parentCommentId?: string | null;
    loading?: boolean;
    onSubmit: (text: string, parentCommentId?: string | null) => Promise<void>;
}

export function CommentForm({
    user,
    parentCommentId,
    loading = false,
    onSubmit,
}: CommentFormProps) {
    const [commentText, setCommentText] = useState("");
    const { handleOpen: handleOpenAuthModal } = useAuthModal();

    function handleFocus() {
        if (!user) handleOpenAuthModal();
    }

    async function handleSubmit() {
        if (!user) handleOpenAuthModal();
        if (!commentText || !commentText.trim() || !user) return;
        onSubmit(commentText, parentCommentId);
        setCommentText("");
    }

    return (
        <div>
            <Group align="flex-start">
                <Avatar
                    size={parentCommentId ? "md" : "lg"}
                    name={user?.name || "Abhishek"}
                    src={user?.profile_pic}
                    color="initials"
                    alt={user?.name}
                />
                <Textarea
                    placeholder="Type your comment here..."
                    autosize
                    minRows={parentCommentId ? 2 : 3}
                    flex={1}
                    maxLength={2000}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onClick={handleFocus}
                />
            </Group>
            <Group justify="flex-end" mt="md">
                <Button
                    loading={loading}
                    disabled={loading || !commentText?.trim()}
                    onClick={handleSubmit}
                >
                    {parentCommentId ? "Reply" : "Post Comment"}
                </Button>
            </Group>
        </div>
    );
}
