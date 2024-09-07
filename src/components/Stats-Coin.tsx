import { StatsCoin as IStatsCoin } from "@/lib/types";
import { Avatar, Group, Text, Skeleton, Paper } from "@mantine/core";
import { Link } from "react-router-dom";

export function StatsCoin({ uuid, name, symbol, iconUrl }: IStatsCoin) {
    return (
        <Link to={`/coin/${uuid}`} style={{ textDecoration: "none" }}>
            <Paper withBorder radius="md" p="xs" className="bg-primary">
                <Group>
                    <Avatar size={50} src={iconUrl} radius={26} />
                    <div>
                        <Text fw={600}>{name}</Text>
                        <Text fw={600} size="xs" c="dimmed">
                            {symbol}
                        </Text>
                    </div>
                </Group>
            </Paper>
        </Link>
    );
}

export function StatsCoinLoader() {
    return (
        <div>
            <Group gap="sm">
                <Skeleton h={40} w={40} circle />
                <div>
                    <Skeleton h={20} />
                    <Skeleton h={20} w={50} mt={5} />
                </div>
            </Group>
        </div>
    );
}
