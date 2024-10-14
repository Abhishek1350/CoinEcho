import { Card, Text, Skeleton, Box } from "@mantine/core";
import { News } from "@/lib/types";
import { getTimeAgo } from "@/lib/utils";
import { LazyImage } from "./Lazy-Image";

export function NewsCard({ title, url, thumbnail, createdAt }: News) {
    return (
        <Card
            radius="md"
            shadow="sm"
            className="bg-secondary"
            padding="md"
            component="a"
            href={url}
            target="_blank"
        >
            <Card.Section>
                <LazyImage
                    className="video-aspect"
                    src={thumbnail}
                    height={200}
                    alt={title}
                />
            </Card.Section>

            <Text fw={600} size="lg" mt="md">
                {title}
            </Text>

            <Text fw={500} mt="md" c="dimmed" size="sm">
                {getTimeAgo(createdAt)}
            </Text>
        </Card>
    );
}

export function NewsCardLoader() {
    return (
        <Card radius="md" shadow="sm" className="bg-secondary" p={0}>
            <Skeleton height={200} />
            <Box p="md">
                <Box>
                    <Skeleton height={10} radius="lg" />
                    <Skeleton height={10} mt={6} radius="lg" />
                    <Skeleton height={10} mt={6} width="70%" radius="lg" />
                </Box>
                <Skeleton height={20} mt="md" width="50%" radius="lg" />
            </Box>
        </Card>
    );
}
