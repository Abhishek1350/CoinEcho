import {
    Table,
    ScrollArea,
    Group,
    Avatar,
    Text,
    Skeleton,
    NumberFormatter,
    useMantineColorScheme,
} from "@mantine/core";
import { CurrencyFilter, ListsCoin } from "@/lib/types";
import { formatCompactCurrency } from "@/lib/utils";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

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
    selectedTimeline
}: CoinsTableProps) {
    const navigate = useNavigate();
    const { colorScheme } = useMantineColorScheme();
    selectedTimeline = selectedTimeline.toUpperCase()

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
                <Table.Td>{coin?.rank}</Table.Td>
                <Table.Td>
                    <Group gap="sm">
                        <Avatar size={40} src={coin?.iconUrl} radius={26} />
                        <div>
                            <Text size="sm" fw={600}>
                                {coin?.name}
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
                        <Table.Th>Rank</Table.Th>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Price</Table.Th>
                        <Table.Th>Change ({selectedTimeline})</Table.Th>
                        <Table.Th>Market Cap</Table.Th>
                        <Table.Th>Volume (24h)</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{isLoading ? <TableBodyLoader /> : rows}</Table.Tbody>
            </Table>
        </ScrollArea>
    );
}

function TableBodyLoader() {
    return Array.from({ length: 10 }).map((_, i) => (
        <Table.Tr key={i}>
            <Table.Td>
                <Skeleton h={20} w={20} />
            </Table.Td>
            <Table.Td>
                <Group gap="sm">
                    <Skeleton h={40} w={40} circle />
                    <div>
                        <Skeleton h={15} w={200} />
                        <Skeleton h={15} w={50} mt={5} />
                    </div>
                </Group>
            </Table.Td>
            <Table.Td>
                <Skeleton h={20} w={150} />
            </Table.Td>
            <Table.Td>
                <Skeleton h={20} w={50} />
            </Table.Td>
            <Table.Td>
                <Skeleton h={20} w={100} />
            </Table.Td>
            <Table.Td>
                <Skeleton h={20} w={100} />
            </Table.Td>
        </Table.Tr>
    ));
}
