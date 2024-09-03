import { Container, Title, Text } from "@mantine/core";
import classes from "./Home.module.css";
import { useState } from "react";
import { SearchInput } from "@/components";

export function HomePage() {
  const [value, setValue] = useState("");

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
        <SearchInput value={value} setValue={setValue} />
      </Container>
    </section>
  );
}
