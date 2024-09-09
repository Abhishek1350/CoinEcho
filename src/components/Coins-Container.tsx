import { useState } from "react";
import { CurrencyFilter } from "@/lib/types";
import { useAllCoins } from "@/lib/useApi";
import { CoinsTable, Pagination } from ".";
import {
    Container,
    Flex,
    Group,
    Title,
    NumberFormatter,
    Text,
    Select,
} from "@mantine/core";
import {
    timelineFilters,
    orderByFilters,
    orderDirectionFilters,
} from "@/config/filters";
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
    const [selectedTimeline, setSelectedTimeline] = useState("3h");

    const [orderBy, setOrderBy] = useState("Market Cap");
    const [orderDirection, setOrderDirection] = useState(
        orderDirectionFilters[0].label
    );

    const [searchParams] = useSearchParams();

    const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
        duration: 500,
        offset: 20,
    });

    const currentPage = searchParams.get("page")
        ? Number(searchParams.get("page"))
        : 1;

    const { data: coins, isLoading } = useAllCoins({
        referenceCurrencyUuid: selectedCurrency.uuid,
        limit: ITEMS_PER_PAGE,
        timePeriod: selectedTimeline,
        offset: (currentPage - 1) * ITEMS_PER_PAGE,
        orderBy: prepareSortingforApi(orderBy),
        orderDirection: prepareSortingforApi(orderDirection, "orderDirection"),
    });

    function handleTimePeriodChange(timePeriod: string | null) {
        if (!timePeriod) return;
        setSelectedTimeline(timePeriod);
    }

    function handleOrderByChange(sortingFilter: string | null) {
        if (!sortingFilter) return;
        setOrderBy(sortingFilter);
    }

    function handleOrderDirectionChange(orderBy: string | null) {
        if (!orderBy) return;
        setOrderDirection(orderBy);
    }

    function prepareSortingforApi(
        currentFilter: string,
        type: "orderBy" | "orderDirection" = "orderBy"
    ) {
        if (type === "orderDirection") {
            return (
                orderDirectionFilters.find((filter) => filter.label === currentFilter)
                    ?.value || ""
            );
        }

        return (
            orderByFilters.find((filter) => filter.label === currentFilter)?.value ||
            ""
        );
    }

    return (
        <Container size="lg" p={0}>
            <Flex
                mb="sm"
                justify="space-between"
                gap="lg"
                wrap="wrap"
                ref={targetRef}
            >
                <Group gap={8} align="end">
                    <Title order={2}>Crypto prices</Title>
                    <Text c="dimmed" size="sm">
                        <NumberFormatter value={totalCoins} thousandSeparator /> Assets
                    </Text>
                </Group>
                <Group gap={10} align="end">
                    <Select
                        data={orderByFilters.map((filter) => filter.label)}
                        value={orderBy}
                        onChange={handleOrderByChange}
                        maw={150}
                        size="sm"
                        allowDeselect={false}
                        checkIconPosition="right"
                        maxDropdownHeight={400}
                        classNames={{ dropdown: "bg-secondary" }}
                        radius="xl"
                        styles={{
                            option: { fontWeight: 600 },
                            input: { fontWeight: 600 },
                        }}
                    />
                    <Select
                        data={orderDirectionFilters.map((filter) => filter.label)}
                        value={orderDirection}
                        onChange={handleOrderDirectionChange}
                        maw={120}
                        size="sm"
                        allowDeselect={false}
                        checkIconPosition="right"
                        maxDropdownHeight={400}
                        classNames={{ dropdown: "bg-secondary" }}
                        radius="xl"
                        styles={{
                            option: { fontWeight: 600 },
                            input: { fontWeight: 600 },
                        }}
                    />
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
                </Group>
            </Flex>
            <CoinsTable
                coins={coins?.data.coins}
                isLoading={isLoading}
                selectedCurrency={selectedCurrency}
                selectedTimeline={selectedTimeline}
            />
            <Container mt={15} p={0}>
                <Pagination
                    totalItems={totalCoins || 0}
                    currentPage={currentPage}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageChange={() => scrollIntoView({ alignment: "start" })}
                />
            </Container>
        </Container>
    );
}
