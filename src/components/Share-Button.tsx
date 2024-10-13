import { ActionIcon } from "@mantine/core";
import { IconShare } from "@tabler/icons-react";
import { RWebShare } from "react-web-share";

interface Props {
    title?: string;
    text?: string;
    url?: string;
}

export function ShareButton({ title, text, url }: Props) {
    return (
        <RWebShare
            data={{
                title: title || "CoinEcho",
                text: text || "Explore the crypto market",
                url: url || window.location.href,
            }}
        >
            <ActionIcon
                variant="gradient"
                size="lg"
                aria-label="Share"
                gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
            >
                <IconShare stroke={1.5} />
            </ActionIcon>
        </RWebShare>
    );
}
