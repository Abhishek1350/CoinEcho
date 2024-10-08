import { CurrencyFilter } from "@/lib/types";
import { useAllCoins } from "@/lib/useApi";
import { CoinsTable, Pagination, FilterItem } from ".";
import {
    Container,
    Flex,
    Group,
    Title,
    NumberFormatter,
    Text,
} from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import { useFilters } from "@/hooks/useFilters";
import {
    timelineFilters,
    orderByFilters,
    orderDirectionFilters,
} from "@/config/filters";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

interface CoinsContainerProps {
    selectedCurrency: CurrencyFilter;
    totalCoins?: number;
}

const ITEMS_PER_PAGE = 20;

export function CoinsContainer({
    selectedCurrency,
    totalCoins,
}: CoinsContainerProps) {
    const { timeline, orderBy, orderDirection, handleFilterChange, currentPage } =
        useFilters();

    const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
        duration: 500,
        offset: 20,
    });

    const [searchParams] = useSearchParams();

    const currentPageInQuery = searchParams.get("page");

    const { data: coins, isLoading } = useAllCoins({
        referenceCurrencyUuid: selectedCurrency.uuid,
        limit: ITEMS_PER_PAGE,
        timePeriod: timeline,
        offset: (currentPage - 1) * ITEMS_PER_PAGE,
        orderBy: prepareSortingforApi(orderBy),
        orderDirection: prepareSortingforApi(orderDirection, "orderDirection"),
    });

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

    useEffect(() => {
        if (!currentPageInQuery) return;
        scrollIntoView({ alignment: "start" });
    }, [currentPage]);

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
                    <FilterItem
                        value={orderBy}
                        data={orderByFilters.map((filter) => filter.label)}
                        onChange={(value) => handleFilterChange("orderBy", value!)}
                        styles={{
                            option: { fontWeight: 600 },
                            input: { fontWeight: 600 },
                        }}
                    />
                    <FilterItem
                        data={orderDirectionFilters.map((filter) => filter.label)}
                        value={orderDirection}
                        onChange={(value) => handleFilterChange("orderDirection", value!)}
                        maxWidth={120}
                        styles={{
                            option: { fontWeight: 600 },
                            input: { fontWeight: 600 },
                        }}
                    />
                    <FilterItem
                        data={timelineFilters}
                        value={timeline}
                        onChange={(value) => handleFilterChange("timeline", value!)}
                        maxWidth={80}
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
                selectedTimeline={timeline}
            />
            <Container mt={15} p={0}>
                <Pagination
                    totalItems={totalCoins || 0}
                    currentPage={currentPage}
                    itemsPerPage={ITEMS_PER_PAGE}
                />
            </Container>
        </Container>
    );
}
