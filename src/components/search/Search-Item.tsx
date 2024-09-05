import { Group, Avatar, Text, Skeleton, Divider } from "@mantine/core";
import { ListsCoin } from "@/lib/types";
import { Link } from "react-router-dom";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";
import classes from "./Search.module.css";
import { formatCompactCurrency } from "@/lib/utils";
import { CurrencyFilter } from "@/lib/types";

interface SearchItemProps extends ListsCoin {
    showDivider?: boolean;
    selectedCurrency: CurrencyFilter;
}

export function SearchItem({
    uuid,
    symbol,
    name,
    iconUrl,
    price,
    change,
    showDivider = false,
    selectedCurrency,
}: SearchItemProps) {
    return (
        <>
            <Link
                to={`/coin/${uuid}`}
                className={`${classes.searchItem} text-secondary`}
            >
                <Group>
                    <Avatar src={iconUrl} />
                    <div className={classes.searchItemDetails}>
                        <Group gap={5}>
                            <Text size="sm" fw={500}>
                                {name}
                            </Text>
                            <Text c="dimmed" size="xs">
                                {symbol}
                            </Text>
                        </Group>
                        <Text size="sm" fw={500}>
                            {selectedCurrency.sign}
                            {formatCompactCurrency(Number(price))}
                        </Text>
                    </div>

                    <div className={classes.searchItemPrice}>
                        <Group>
                            <Text c={Number(change) > 0 ? "teal" : "red"} fz="sm" fw={500}>
                                <span>{change}%</span>
                                {Number(change) > 0 ? (
                                    <IconArrowUpRight size="1rem" stroke={1.5} />
                                ) : (
                                    <IconArrowDownRight size="1rem" stroke={1.5} />
                                )}
                            </Text>
                        </Group>
                    </div>
                </Group>
            </Link>
            {showDivider && <Divider />}
        </>
    );
}

export function SearchItemLoder({ showDivider = false }) {
    return (
        <>
            <div className={`${classes.searchItem} text-secondary`}>
                <Group>
                    <Skeleton height={50} circle />
                    <div className={classes.searchItemDetails}>
                        <Group gap={5} mb={10}>
                            <Skeleton height={15} width={100} />
                            <Skeleton height={15} width={20} />
                        </Group>
                        <Skeleton height={12} width={50} />
                    </div>
                    <Skeleton height={15} width={30} />
                </Group>
            </div>
            {showDivider && <Divider />}
        </>
    );
}
