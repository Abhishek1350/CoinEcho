import { Text } from "@mantine/core";
import { Link } from "react-router-dom";
export function Logo({ size }: { size?: number }) {
    return (
        <Text
            fw={900}
            style={{
                fontSize: size || 24,
            }}
        >
            <Link
                style={{
                    textDecoration: "none",
                    color:
                        "light-dark(var(--mantine-color-blue-7), var(--mantine-color-blue-6))",
                }}
                to="/"
            >
                CoinEcho
            </Link>
        </Text>
    );
}
