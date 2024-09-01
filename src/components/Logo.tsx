import { Text } from "@mantine/core";
import { Link } from "react-router-dom";
export function Logo({ size }: { size?: number }) {
    return (
        <Text
            variant="gradient"
            gradient={{ from: "blue", to: "indigo", deg: 120 }}
            fw={900}
            style={{ fontSize: size || 24 }}
        >
            <Link to="/">CoinEcho</Link>
        </Text>
    );
}
