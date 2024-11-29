import {
    Text,
    Spoiler,
    Skeleton,
    Paper,
    Group,
    Avatar,
    Box,
    Anchor,
    Flex,
} from "@mantine/core";
import { Comment } from "@/hooks/useComments";
import { getRelativeTime } from "@/lib/utils";
import { useState } from "react";
import { CommentForm } from "./Comment-Form";

interface CommentCardProps extends Comment {
    onSubmit: (text: string) => Promise<void>;
}

export function CommentCard({
    id,
    user,
    text,
    created_at,
    replies,
    onSubmit,
}: CommentCardProps) {
    const [toggleReply, setToggleReply] = useState(false);
    const [showReplies, setShowReplies] = useState(false);

    return (
        <Paper withBorder radius="md" p="md" mih={130}>
            <Group>
                <Avatar
                    src={user?.profile_pic}
                    alt={user?.name}
                    name={user?.name}
                    radius="xl"
                    color="initials"
                />
                <div>
                    <Text fw={600} fz="sm">
                        {user?.name}
                    </Text>
                    <Text fz="xs" c="dimmed">
                        {getRelativeTime(created_at)}
                    </Text>
                </div>
            </Group>
            <Box mt="sm">
                <Spoiler
                    maxHeight={60}
                    showLabel="Show more"
                    hideLabel="Hide"
                    styles={{ control: { paddingLeft: "54px" } }}
                >
                    <Text size="sm" pl={54} className="comment-text">
                        {text}
                    </Text>
                </Spoiler>

                <Group justify="space-between" pl={54} mt="sm">
                    <Anchor onClick={() => setToggleReply(!toggleReply)} size="sm">
                        {toggleReply ? "Cancel" : "Reply"}
                    </Anchor>
                    {replies?.length ? (
                        <Anchor onClick={() => setShowReplies(!showReplies)} size="sm">
                            {showReplies ? "Hide" : "Show"} replies
                        </Anchor>
                    ) : null}
                </Group>

                {toggleReply && (
                    <Box mt="sm">
                        <CommentForm user={user} parentCommentId={id} onSubmit={onSubmit} />
                    </Box>
                )}

                {showReplies && (
                    <Flex mt="md" direction="column" gap="md">
                        {replies?.map((reply) => (
                            <CommentCard key={reply.id} {...reply} onSubmit={onSubmit} />
                        ))}
                    </Flex>
                )}
            </Box>
        </Paper>
    );
}

export function CommentCardLoader() {
    return (
        <Paper withBorder radius="md" p="md">
            <Group>
                <Skeleton height={40} width={40} circle />
                <div>
                    <Skeleton height={12} width={100} radius="xl" />
                    <Skeleton height={12} width={100} mt="xs" />
                </div>
            </Group>
            <Box pl={54} mt="sm">
                <Text>
                    <Skeleton height={40} />
                </Text>
                <Skeleton height={12} width={80} mt="sm" />
            </Box>
        </Paper>
    );
}
