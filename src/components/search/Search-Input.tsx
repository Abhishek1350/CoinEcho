import {
    Container,
    Input,
    ScrollArea,
    Flex,
    Modal,
    Divider,
    Text,
    NumberFormatter,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import classes from "./Search.module.css";
import { useState } from "react";
import { SearchItem, SearchItemLoder } from "./Search-Item";
import { useDisclosure, useDebouncedValue } from "@mantine/hooks";
import { useSearch } from "@/hooks/useSearch";
import { useCurrency } from "@/context/Currency-Context";

export function SearchInput({
    totalCoins,
}: {
    totalCoins: number | undefined;
}) {
    const [query, setQuery] = useState("");
    const [opened, { open, close }] = useDisclosure(false);
    const [debouncedQuery] = useDebouncedValue(query, 500);
    const { selectedCurrency } = useCurrency();

    const {
        data: searchResult,
        isLoading,
        error,
    } = useSearch({ query: debouncedQuery });

    function handleModalClose() {
        setQuery("");
        close();
    }

    function renderContent() {
        if (isLoading) return <LoadingElement />;

        if (error) return <ErrorElement />;

        if (!searchResult || !debouncedQuery.trim().length)
            return <EmptyElement totalCoins={totalCoins} />;

        if (searchResult.length === 0)
            return <NoResultElement query={debouncedQuery} />;

        return searchResult.map((coin) => (
            <SearchItem
                key={coin.uuid}
                {...coin}
                selectedCurrency={selectedCurrency}
                showDivider
            />
        ));
    }

    return (
        <Container className={classes.wrapper} maw={500}>
            <Input
                styles={{ input: { cursor: "pointer" } }}
                placeholder="Search for an asset"
                radius="xl"
                mx="auto"
                size="lg"
                readOnly
                rightSectionPointerEvents="all"
                mt="md"
                onClick={open}
                leftSection={<IconSearch size={16} />}
            />
            <Modal.Root opened={opened} onClose={handleModalClose} maw={500} centered>
                <Modal.Overlay />
                <Modal.Content>
                    <Modal.Header className="bg-secondary" p={0} h={20}>
                        <Input
                            styles={{ wrapper: { width: "100%" } }}
                            variant="unstyled"
                            placeholder="Search for an asset"
                            radius="xl"
                            size="lg"
                            rightSectionPointerEvents="all"
                            onClick={open}
                            leftSection={<IconSearch size={20} />}
                            value={query}
                            onChange={(event) => setQuery(event.currentTarget.value)}
                        />
                        <Modal.CloseButton mr={10} />
                    </Modal.Header>
                    <Divider />
                    <Modal.Body className="bg-secondary" p={0}>
                        <ScrollArea
                            h={
                                !searchResult ||
                                    !searchResult.length ||
                                    !debouncedQuery.trim().length
                                    ? "auto"
                                    : 300
                            }
                            className={`${classes.searchResults} bg-secondary`}
                            p="md"
                        >
                            <Flex direction="column">{renderContent()}</Flex>
                        </ScrollArea>
                    </Modal.Body>
                </Modal.Content>
            </Modal.Root>
        </Container>
    );
}

function LoadingElement() {
    return Array.from({ length: 5 }).map((_, i) => (
        <SearchItemLoder key={i} showDivider />
    ));
}

function ErrorElement() {
    return (
        <Text c="red" ta="center" fw={600}>
            Something went wrong!
        </Text>
    );
}

function EmptyElement({ totalCoins }: { totalCoins: number | undefined }) {
    return (
        <Text c="dimmed" ta="center" fw={600}>
            Search in <NumberFormatter value={totalCoins} thousandSeparator />{" "}
            Cryptocurrencies
        </Text>
    );
}

function NoResultElement({ query }: { query: string }) {
    return (
        <Text c="dimmed" ta="center" fw={600}>
            No results found for "{query}"
        </Text>
    );
}
