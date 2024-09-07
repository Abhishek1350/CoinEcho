import { useState } from "react";
import { CurrencyFilter } from "@/lib/types";
import { useAllCoins } from "@/lib/useApi";
import { CoinsTable } from "../Coins-Table";
import {
    Flex,
    Group,
    Title,
    NumberFormatter,
    Text,
    Select,
} from "@mantine/core";
import { timelineFilters } from "@/config/filters";

interface CoinsContainerProps {
    selectedCurrency: CurrencyFilter;
    totalCoins?: number;
}

export function CoinsContainer({
    selectedCurrency,
    totalCoins,
}: CoinsContainerProps) {
    const [selectedTimeline, setSelectedTimeline] = useState<string>("7d");
    const { data: coins, isLoading } = useAllCoins({
        referenceCurrencyUuid: selectedCurrency.uuid,
        limit: 20,
        timePeriod: selectedTimeline,
    });

    function handleTimePeriodChange(timePeriod: any) {
        setSelectedTimeline(timePeriod);
    }

    return (
        <div>
            <Flex mb="lg" justify="space-between">
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
        </div>
    );
}
