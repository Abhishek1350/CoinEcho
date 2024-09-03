import { Container, Title, Text } from "@mantine/core";
import classes from "./Home.module.css";
import { SearchInput } from "@/components";

export function HomePage() {
  return (
    <section className={classes.section}>
      <Container size="lg">
        <Title className={classes.title} ta="center">
          Explore the{" "}
          <Text inherit className={classes.highlight} component="span">
            Cryptoeconomy
          </Text>{" "}
          <br />
        </Title>
        <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="sm" mb="lg">
          In the past 24 hours the market is up 0.67%
        </Text>
        <SearchInput />
      </Container>
    </section>
  );
}
