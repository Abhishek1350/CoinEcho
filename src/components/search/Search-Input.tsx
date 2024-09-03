import { Container, Input, CloseButton, ScrollArea, Flex, Divider } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import classes from "./Search.module.css";
import { useState } from "react";
import { useAllCoins } from "@/lib/useApi";
import { SearchItem } from "./Search-Item";

export function SearchInput() {
    const [value, setValue] = useState("");

    const { data, error, isLoading } = useAllCoins();

    if (error) return <h1>Error</h1>;
    if (isLoading) return <h1>Loading</h1>;
    if (!data?.data.coins?.length) return <h1>No Data</h1>;

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
                    {
                        data?.data.coins.map((coin) => (
                            <>
                                <SearchItem key={coin.uuid} {...coin} />
                                <Divider />
                            </>
                        ))
                    }
                </Flex>
            </ScrollArea>
        </Container>
    );
}
