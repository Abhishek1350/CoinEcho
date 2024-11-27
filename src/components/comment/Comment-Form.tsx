import { useAuthModal } from "@/context";
import { User } from "@/lib/types";
import { Group, Avatar, Textarea, Button } from "@mantine/core";
import { useState } from "react";

interface CommentFormProps {
    user?: Pick<User, "name" | "profile_pic"> | null;
    nested?: boolean;
    loading?: boolean;
    onSubmit: (text: string) => Promise<void>;
}

export function CommentForm({
    user,
    nested = false,
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
        onSubmit(commentText);
        setCommentText("");
    }

    return (
        <div>
            <Group align="flex-start">
                <Avatar
                    size={nested ? "md" : "lg"}
                    name={user?.name || "Abhishek"}
                    src={user?.profile_pic}
                    color="initials"
                    alt={user?.name}
                />
                <Textarea
                    placeholder="Type your comment here..."
                    autosize
                    minRows={nested ? 2 : 3}
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
                    {nested ? "Reply" : "Post Comment"}
                </Button>
            </Group>
        </div>
    );
}
