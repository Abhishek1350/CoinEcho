import { useState } from "react";
import { CurrencyFilter } from "@/lib/types";
import { useAllCoins } from "@/lib/useApi";
import { CoinsTable, Pagination } from "../";
import {
    Flex,
    Group,
    Title,
    NumberFormatter,
    Text,
    Select,
    Box,
} from "@mantine/core";
import { timelineFilters } from "@/config/filters";
import { useSearchParams } from "react-router-dom";
import { useScrollIntoView } from "@mantine/hooks";

interface CoinsContainerProps {
    selectedCurrency: CurrencyFilter;
    totalCoins?: number;
}

const ITEMS_PER_PAGE = 20;

export function CoinsContainer({
    selectedCurrency,
    totalCoins,
}: CoinsContainerProps) {
    const [selectedTimeline, setSelectedTimeline] = useState<string>("7d");
    const [searchParams] = useSearchParams();

    const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();

    const currentPage = searchParams.get("page")
        ? Number(searchParams.get("page"))
        : 1;

    const { data: coins, isLoading } = useAllCoins({
        referenceCurrencyUuid: selectedCurrency.uuid,
        limit: ITEMS_PER_PAGE,
        timePeriod: selectedTimeline,
        offset: (currentPage - 1) * ITEMS_PER_PAGE,
    });

    function handleTimePeriodChange(timePeriod: any) {
        setSelectedTimeline(timePeriod);
    }

    return (
        <Box>
            <Flex mb="sm" justify="space-between" ref={targetRef} pt={20}>
                <Group gap={8} align="end">
                    <Title order={2}>Crypto prices</Title>
                    <Text c="dimmed" size="sm">
                        <NumberFormatter value={totalCoins} thousandSeparator /> Assets
                    </Text>
                </Group>
                <Select
                    data={timelineFilters}
                    value={selectedTimeline}
                    onChange={handleTimePeriodChange}
                    maw={80}
                    size="sm"
                    allowDeselect={false}
                    checkIconPosition="right"
                    maxDropdownHeight={400}
                    classNames={{ dropdown: "bg-secondary" }}
                    radius="xl"
                    styles={{
                        option: { textTransform: "uppercase", fontWeight: 600 },
                        input: { textTransform: "uppercase", fontWeight: 600 },
                    }}
                />
            </Flex>
            <CoinsTable
                coins={coins?.data.coins}
                isLoading={isLoading}
                selectedCurrency={selectedCurrency}
                selectedTimeline={selectedTimeline}
            />
            <Box mt={10}>
                <Pagination
                    totalItems={totalCoins || 0}
                    currentPage={currentPage}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageChange={() => scrollIntoView({ alignment: "start" })}
                />
            </Box>
        </Box>
    );
}
