import {
    Table,
    ScrollArea,
    Group,
    Text,
    Skeleton,
    NumberFormatter,
    useMantineColorScheme,
} from "@mantine/core";
import { CurrencyFilter, ListsCoin } from "@/lib/types";
import {
    formatCompactCurrency,
    shortName,
    prepareSparklineData,
} from "@/lib/utils";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { SmallChart, LazyImage } from "./";

interface CoinsTableProps {
    coins: ListsCoin[] | undefined;
    isLoading: boolean;
    selectedCurrency: CurrencyFilter;
    selectedTimeline: string;
}

export function CoinsTable({
    coins,
    isLoading,
    selectedCurrency,
    selectedTimeline,
}: CoinsTableProps) {
    const navigate = useNavigate();
    const { colorScheme } = useMantineColorScheme();
    selectedTimeline = selectedTimeline.toUpperCase();

    function handleCoinClick(coin: ListsCoin) {
        navigate(`/coin/${coin.uuid}`);
    }

    const rows = coins?.map((coin) => {
        const price =
            Number(coin?.price) < 1 ? (
                `${selectedCurrency.sign}${formatCompactCurrency(coin?.price)}`
            ) : (
                <NumberFormatter
                    value={coin?.price}
                    thousandSeparator
                    decimalScale={Number(coin?.price) < 100 ? 2 : 0}
                    prefix={selectedCurrency.sign}
                />
            );

        const PriceChange = () => (
            <Group>
                <Text c={Number(coin?.change) > 0 ? "teal" : "red"} fz="sm" fw={500}>
                    <span>{coin?.change}%</span>
                    {Number(coin?.change) > 0 ? (
                        <IconArrowUpRight size="1rem" stroke={1.5} />
                    ) : (
                        <IconArrowDownRight size="1rem" stroke={1.5} />
                    )}
                </Text>
            </Group>
        );

        return (
            <Table.Tr
                key={coin.uuid}
                onClick={() => handleCoinClick(coin)}
                style={{ cursor: "pointer" }}
            >
                <Table.Td>
                    <Group gap="sm">
                        <LazyImage
                            src={coin?.iconUrl}
                            width={40}
                            alt={coin.name}
                        />
                        <div>
                            <Text size="sm" fw={600}>
                                {shortName(coin?.name)}
                            </Text>
                            <Text size="sm" c="dimmed" fw={600}>
                                {coin?.symbol}
                            </Text>
                        </div>
                    </Group>
                </Table.Td>
                <Table.Td>
                    <Text fw={500}>{price}</Text>
                </Table.Td>
                <Table.Td>
                    <PriceChange />
                </Table.Td>
                <Table.Td>
                    <Text fw={500}>
                        {selectedCurrency.sign}
                        {formatCompactCurrency(coin?.marketCap)}
                    </Text>
                </Table.Td>
                <Table.Td>
                    <Text fw={500}>
                        {" "}
                        {selectedCurrency.sign}
                        {formatCompactCurrency(coin?.["24hVolume"])}
                    </Text>
                </Table.Td>
                <Table.Td>
                    {coin?.sparkline && coin?.sparkline?.length && (
                        <SmallChart data={prepareSparklineData(coin?.sparkline)} />
                    )}
                </Table.Td>
            </Table.Tr>
        );
    });

    return (
        <ScrollArea>
            <Table
                miw={800}
                verticalSpacing="sm"
                highlightOnHover
                highlightOnHoverColor={colorScheme === "light" ? "" : "#1e2025"}
            >
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Price</Table.Th>
                        <Table.Th>Change ({selectedTimeline})</Table.Th>
                        <Table.Th>Market Cap</Table.Th>
                        <Table.Th>Volume (24h)</Table.Th>
                        <Table.Th>Chart</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{isLoading ? <TableBodyLoader /> : rows}</Table.Tbody>
            </Table>
        </ScrollArea>
    );
}

function TableBodyLoader() {
    return Array.from({ length: 20 }).map((_, i) => (
        <Table.Tr key={i}>
            <Table.Td>
                <Group gap="sm">
                    <Skeleton h={40} w={40} circle />
                    <div>
                        <Skeleton h={15} w={150} />
                        <Skeleton h={15} w={50} mt={5} />
                    </div>
                </Group>
            </Table.Td>
            <Table.Td>
                <Skeleton h={20} w={80} />
            </Table.Td>
            <Table.Td>
                <Skeleton h={20} w={50} />
            </Table.Td>
            <Table.Td>
                <Skeleton h={20} w={80} />
            </Table.Td>
            <Table.Td>
                <Skeleton h={20} w={80} />
            </Table.Td>
            <Table.Td>
                <Skeleton h={20} w={120} />
            </Table.Td>
        </Table.Tr>
    ));
}
