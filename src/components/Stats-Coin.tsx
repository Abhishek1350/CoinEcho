import { StatsCoin as IStatsCoin } from "@/lib/types";
import { Group, Text, Skeleton } from "@mantine/core";
import { Link } from "react-router-dom";
import { LazyImage } from "./Lazy-Image";

export function StatsCoin({ uuid, name, symbol, iconUrl }: IStatsCoin) {
    return (
        <Link
            to={`/coin-details?uuid=${uuid}`}
            style={{
                textDecoration: "none",
                color: "inherit",
                width: "100%",
                padding: "10px 5px",
                borderRadius: "5px",
            }}
            className="hover"
        >
            <Group>
                <LazyImage src={iconUrl} width={40} alt={name} />
                <div>
                    <Text fw={600}>{name}</Text>
                    <Text fw={600} size="xs" c="dimmed">
                        {symbol}
                    </Text>
                </div>
            </Group>
        </Link>
    );
}

export function StatsCoinLoader() {
    return (
        <div>
            <Group gap="sm">
                <Skeleton h={40} w={40} circle />
                <div>
                    <Skeleton h={20} width={150} />
                    <Skeleton h={20} w={50} mt={5} />
                </div>
            </Group>
        </div>
    );
}
