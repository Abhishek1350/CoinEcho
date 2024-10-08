import { Container, Box, Group, Skeleton } from "@mantine/core";
import classes from "./styles.module.css";

export default function PageSkeleton() {
    return (
        <section className={classes.section}>
            <Container size="lg">
                <Box className={classes.header}>
                    <Group justify="space-between">
                        <Box>
                            <Group gap={5}>
                                <Skeleton height={50} width={50} circle />
                                <Skeleton height={35} width={150} />
                            </Group>
                        </Box>

                        <Group justify="center">
                            <Skeleton height={34} width={34} />
                            <Skeleton height={34} width={34} />
                            <Skeleton height={34} width={130} />
                            <Skeleton height={34} width={237} radius="lg" />
                        </Group>
                    </Group>
                </Box>

                <Box className={classes.content} mt={50}>
                    <Group justify="space-between">
                        <Box>
                            <Skeleton height={20} width={80} />
                            <Group gap={5} mt={10}>
                                <Skeleton height={30} width={150} />
                                <Skeleton height={20} width={50} />
                            </Group>
                        </Box>
                        <Box>
                            <Group gap={5} mb={10}>
                                <Skeleton height={30} width={70} />
                                <Skeleton height={20} width={200} />
                            </Group>
                            <Skeleton height={30} width={150} />
                        </Box>
                    </Group>

                    <Box className={classes.chart} mt={40}>
                        <Skeleton height={400} />
                    </Box>
                </Box>
            </Container>
        </section>
    );
}
