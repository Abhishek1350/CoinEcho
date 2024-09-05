import { Container, Input, CloseButton, ScrollArea, Flex } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import classes from "./Search.module.css";
import { useState } from "react";
import { useAllCoins } from "@/lib/useApi";
import { SearchItem, SearchItemLoder } from "./Search-Item";

export function SearchInput() {
    const [value, setValue] = useState("");

    const { data, error, isLoading } = useAllCoins();

    if (error) return <h1>Error</h1>;

    return (
        <Container className={classes.wrapper} maw={500}>
            <Input
                placeholder="Search for an asset"
                radius="xl"
                mx="auto"
                size="lg"
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
                rightSectionPointerEvents="all"
                mt="md"
                leftSection={<IconAt size={16} />}
                rightSection={
                    <CloseButton
                        aria-label="Clear search"
                        onClick={() => setValue("")}
                        style={{ display: value ? undefined : "none" }}
                    />
                }
            />
            <ScrollArea
                h={300}
                className={`${classes.searchResults} bg-secondary`}
                mt="md"
                mx="auto"
                p="md"
            >
                <Flex direction="column">
                    {isLoading
                        ? Array.from({ length: 5 }).map((_, i) => (
                            <SearchItemLoder key={i} showDivider />
                        ))
                        : data?.data.coins.map((coin) => (
                            <SearchItem key={coin.uuid} {...coin} showDivider />
                        ))}
                </Flex>
            </ScrollArea>
        </Container>
    );
}
