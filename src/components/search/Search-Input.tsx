import {
    Container,
    Input,
    ScrollArea,
    Flex,
    Modal,
    Divider,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import classes from "./Search.module.css";
import { useState } from "react";
import { SearchItem, SearchItemLoder } from "./Search-Item";
import { useDisclosure } from "@mantine/hooks";

export function SearchInput() {
    const [value, setValue] = useState("");
    const [data] = useState<any>([]);
    const [isLoading] = useState(true);
    const [opened, { open, close }] = useDisclosure(false);

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
            <Modal.Root opened={opened} onClose={close} maw={500} centered>
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
                            value={value}
                            onChange={(event) => setValue(event.currentTarget.value)}
                        />
                        <Modal.CloseButton mr={10} />
                    </Modal.Header>
                    <Divider />
                    <Modal.Body className="bg-secondary" p={0}>
                        <ScrollArea
                            h={300}
                            className={`${classes.searchResults} bg-secondary`}
                            p="md"
                        >
                            <Flex direction="column">
                                {isLoading
                                    ? Array.from({ length: 5 }).map((_, i) => (
                                        <SearchItemLoder key={i} showDivider />
                                    ))
                                    : data?.data.coins.map((coin: any) => (
                                        <SearchItem key={coin.uuid} {...coin} showDivider />
                                    ))}
                            </Flex>
                        </ScrollArea>
                    </Modal.Body>
                </Modal.Content>
            </Modal.Root>
        </Container>
    );
}
