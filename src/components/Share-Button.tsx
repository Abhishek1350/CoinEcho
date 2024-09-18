import { ActionIcon } from "@mantine/core";
import { IconShare } from "@tabler/icons-react";

export function ShareButton() {
    return (
        <ActionIcon
            variant="gradient"
            size="lg"
            aria-label="Share"
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
        >
            <IconShare  stroke={1.5} />
        </ActionIcon>
    );
}
