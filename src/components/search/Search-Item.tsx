import { Group, Text, Skeleton, Divider, NumberFormatter } from "@mantine/core";
import { ListsCoin } from "@/lib/types";
import { Link } from "react-router-dom";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";
import classes from "./Search.module.css";
import { formatCompactCurrency } from "@/lib/utils";
import { CurrencyFilter } from "@/lib/types";
import { LazyImage } from "../Lazy-Image";

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
    const priceItem =
        Number(price) < 1 ? (
            `${selectedCurrency.sign}${formatCompactCurrency(price)}`
        ) : (
            <NumberFormatter
                value={price}
                thousandSeparator
                decimalScale={Number(price) < 100 ? 2 : 0}
                prefix={selectedCurrency.sign}
            />
        );

    return (
        <>
            <Link
                to={`/coin/${uuid}`}
                className={`${classes.searchItem} text-secondary`}
            >
                <Group>
                    <LazyImage src={iconUrl} width={40} alt={name} />
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
                            {priceItem}
                        </Text>
                    </div>

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
