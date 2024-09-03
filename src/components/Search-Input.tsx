import { Input, CloseButton } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";

interface Props {
    value: string;
    setValue: (value: string) => void;
}

export function SearchInput({ value, setValue }: Props) {
    return (
        <Input
            placeholder="Search for an asset"
            maw={500}
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
    )
}