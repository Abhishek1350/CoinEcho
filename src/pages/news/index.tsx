import { Container, Title, Text, SegmentedControl, Box } from "@mantine/core";
import classes from "./styles.module.css";
import { newsProviderFilters } from "@/config/filters";
import { useState } from "react";

export default function NewsPage() {
  const [selectedNewsProvider, setSelectedNewsProvider] = useState(
    newsProviderFilters[0]
  );
  return (
    <section className={classes.section}>
      <Container size="lg">
        <Box className={classes.header}>
          <Title className={classes.title} ta="center">
            Latest Crypto{" "}
            <Text inherit className={classes.highlight} component="span">
              News
            </Text>{" "}
            <br />
          </Title>
          <Text
            c="dimmed"
            ta="center"
            size="lg"
            maw={580}
            mx="auto"
            mt={5}
            fw={600}
          >
            Latest crypto news provided by:
          </Text>

          <Box mt={30} className={classes.filters}>
            <SegmentedControl
              data={newsProviderFilters}
              defaultValue={selectedNewsProvider}
              onChange={setSelectedNewsProvider}
              color="blue"
              className="bg-secondary"
              styles={{
                root: {
                  flexWrap: "wrap",
                },
                control: {
                  padding: "0 5px",
                },
                label: {
                  textTransform: "capitalize",
                  fontSize: "18px",
                  fontWeight: "700",
                },
              }}
            />
          </Box>
        </Box>
      </Container>
    </section>
  );
}
