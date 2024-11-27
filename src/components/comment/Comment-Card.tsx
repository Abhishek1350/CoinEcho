import {
    Text,
    Spoiler,
    Skeleton,
    Paper,
    Group,
    Avatar,
    Box,
} from "@mantine/core";

export function CommentCard() {
    return (
        <Paper withBorder radius="md" p="md" h="fit-content">
            <Group>
                <Avatar
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                    alt="Jacob Warnhalter"
                    name="Jacob Warnhalter"
                    radius="xl"
                    color="initials"
                />
                <div>
                    <Text fw={600} fz="sm">
                        Abhishek
                    </Text>
                    <Text fz="xs" c="dimmed">
                        10 minutes ago
                    </Text>
                </div>
            </Group>
            <Box mt="sm">
                <Spoiler
                    maxHeight={60}
                    showLabel="Show more"
                    hideLabel="Hide"
                    styles={{ control: { paddingLeft: "54px" } }}
                >
                    <Text size="sm" pl={54}>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla
                        soluta delectus asperiores voluptatibus illum, autem nam animi
                        maxime tempore et expedita cum quae eligendi corrupti eius quam
                        provident fugiat iste natus! Maxime beatae rerum ab, facilis officia
                        adipisci id facere vitae sapiente ad illo qui quibusdam laudantium
                        accusantium nesciunt molestiae quasi fugit, libero iusto, neque
                        expedita quod. Totam quo quas sit! Consequatur odio dolore ipsa
                        eveniet? Quis officiis ratione veniam illum vitae. Delectus nisi est
                        similique atque, excepturi odit amet iusto voluptatibus. Nulla
                        delectus iure id magnam vel reprehenderit perspiciatis nam rem
                        recusandae. Quas veniam perferendis saepe cumque numquam, vel
                        laboriosam eaque quisquam voluptas sit vitae minus accusamus autem
                        neque velit esse quaerat omnis illum animi vero, praesentium
                        veritatis delectus mollitia quo. Possimus quibusdam voluptatibus,
                        provident itaque ipsa omnis esse maiores veniam consequatur
                        sapiente, natus, quaerat cupiditate quasi vitae labore impedit
                        veritatis sequi velit repellendus obcaecati neque quo dolorum
                        mollitia iste! Necessitatibus, officia reprehenderit. Repudiandae ad
                        assumenda unde iste eveniet. Explicabo libero assumenda voluptatem
                        velit alias molestias? Quas velit corporis, eum excepturi doloribus
                        praesentium facere quasi officiis odio accusamus tenetur alias
                        suscipit ullam. Et animi alias nisi modi temporibus velit, quos
                        doloremque explicabo deserunt eligendi cumque rem! In, dolorem odit.
                    </Text>
                </Spoiler>
            </Box>
        </Paper>
    );
}

export function CommentCardLoader() {
    return (
        <Paper withBorder radius="md" p="md" h="fit-content">
            <Group>
                <Skeleton height={40} width={40} circle />
                <div>
                    <Skeleton height={12} width={100} radius="xl" />
                    <Skeleton height={12} width={100} mt="xs" />
                </div>
            </Group>
            <Box pl={54} mt="sm">
                <Text>
                    <Skeleton height={60} />
                </Text>
                <Skeleton height={12} width={80} mt="sm" />
            </Box>
        </Paper>
    );
}
