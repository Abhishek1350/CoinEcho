import { User } from "@/lib/types";
import { Group, Avatar, Textarea, Button } from "@mantine/core";

interface CommentFormProps {
    user?: Pick<User, "name" | "profile_pic"> | null;
    nested?: boolean;
    loading?: boolean;
}

export function CommentForm({
    user,
    nested = false,
    loading = false,
}: CommentFormProps) {
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
                />
            </Group>
            <Group justify="flex-end" mt="md">
                <Button loading={loading} disabled={loading}>
                    {nested ? "Reply" : "Post Comment"}
                </Button>
            </Group>
        </div>
    );
}
