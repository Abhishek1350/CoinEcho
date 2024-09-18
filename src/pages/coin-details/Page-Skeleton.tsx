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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis repudiandae, quidem corporis quibusdam porro reprehenderit iusto rerum, doloribus maxime adipisci culpa quod. Repellat quod molestias, natus eaque aperiam ducimus obcaecati!
                </Box>
            </Container>
        </section>
    );
}
