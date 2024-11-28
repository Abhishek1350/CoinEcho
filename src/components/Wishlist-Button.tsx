import { ActionIcon } from "@mantine/core";
import { IconStar, IconStarFilled } from "@tabler/icons-react";

interface Props {
    isLiked: boolean;
    onClick: () => void;
    isLoading?: boolean;
}

export function WishlistButton({isLiked, onClick, isLoading}: Props) {
    return (
        <ActionIcon
            onClick={onClick}
            variant="default"
            size="lg"
            aria-label="Add to wishlist"
            className="bg-secondary"
            disabled={isLoading}
        >
            {isLiked ? <IconStarFilled color="red" stroke={1.5} /> : <IconStar stroke={1.5} />}
        </ActionIcon>
    );
}
