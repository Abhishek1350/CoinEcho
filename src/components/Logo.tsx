import { Text } from "@mantine/core";
import { Link } from "react-router-dom";

interface Props{
    size?: number
    onClick?: () => void
}
export function Logo({ size, onClick }: Props) {
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
                onClick={onClick}
                to="/"
            >
                CoinEcho
            </Link>
        </Text>
    );
}
