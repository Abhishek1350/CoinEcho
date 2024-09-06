import { Table, ScrollArea, Group, Avatar, Text } from "@mantine/core";

const data = [
    {
        id: "1",
        avatar:
            "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
        name: "Robert Wolfkisser",
        job: "Engineer",
        email: "rob_wolf@gmail.com",
    },
    {
        id: "2",
        avatar:
            "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png",
        name: "Jill Jailbreaker",
        job: "Engineer",
        email: "jj@breaker.com",
    },
    {
        id: "3",
        avatar:
            "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
        name: "Henry Silkeater",
        job: "Designer",
        email: "henry@silkeater.io",
    },
    {
        id: "4",
        avatar:
            "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png",
        name: "Bill Horsefighter",
        job: "Designer",
        email: "bhorsefighter@gmail.com",
    },
    {
        id: "5",
        avatar:
            "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png",
        name: "Jeremy Footviewer",
        job: "Manager",
        email: "jeremy@foot.dev",
    },
];

export function CoinsTable() {
    const rows = data.map((item) => {
        return (
            <Table.Tr key={item.id}>
                <Table.Td>
                    <Group gap="sm">
                        <Avatar size={40} src={item.avatar} radius={26} />
                        <Text size="sm" fw={500}>
                            {item.name}
                        </Text>
                    </Group>
                </Table.Td>
                <Table.Td>{item.email}</Table.Td>
                <Table.Td>{item.job}</Table.Td>
            </Table.Tr>
        );
    });

    return (
        <ScrollArea>
            <Table miw={800} verticalSpacing="sm">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Price</Table.Th>
                        <Table.Th>Change</Table.Th>
                        <Table.Th>Market Cap</Table.Th>
                        <Table.Th>Volume (24h)</Table.Th>
                        <Table.Th>Supply</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </ScrollArea>
    );
}
