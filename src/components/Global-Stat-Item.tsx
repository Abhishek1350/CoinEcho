import { Center, Group, Paper, RingProgress, Text } from "@mantine/core";
import { IconArrowUpRight } from "@tabler/icons-react";

interface GlobalStatItemProps {
    label: string;
    value: React.ReactElement | string;
    progress: number;
    color: string;
}

export function GlobalStatItem({
    label,
    value,
    progress,
    color,
}: GlobalStatItemProps) {
    return (
        <Paper withBorder radius="md" p="xs" key={label} className="bg-secondary">
            <Group>
                <RingProgress
                    size={80}
                    roundCaps
                    thickness={8}
                    sections={[{ value: progress, color: color }]}
                    label={
                        <Center>
                            <IconArrowUpRight size={20} stroke={1.5} />
                        </Center>
                    }
                />
                <div>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                        {label}
                    </Text>
                    <Text fw={700} size="xl">
                        {value}
                    </Text>
                </div>
            </Group>
        </Paper>
    );
}
