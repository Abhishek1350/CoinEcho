import { ActionIcon } from "@mantine/core";
import { IconStar, IconStarFilled } from "@tabler/icons-react";

interface Props {
    isLiked: boolean;
    onClick: () => void;
}

export function WishlistButton({isLiked, onClick}: Props) {
    return (
        <ActionIcon
            onClick={onClick}
            variant="default"
            size="lg"
            aria-label="Add to wishlist"
            className="bg-secondary"
        >
            {isLiked ? <IconStarFilled color="yellow" stroke={1.5} /> : <IconStar stroke={1.5} />}
        </ActionIcon>
    );
}
