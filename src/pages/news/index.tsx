import {
  Container,
  Title,
  Text,
  SegmentedControl,
  Box,
  SimpleGrid,
} from "@mantine/core";
import classes from "./styles.module.css";
import { newsProviderFilters } from "@/config/filters";
import { useState } from "react";
import { useNews } from "@/lib/useApi";
import { NewsCard, NewsCardLoader } from "@/components";
import { capitalizeFirstLetter } from "@/lib/utils";

export default function NewsPage() {
  const [selectedNewsProvider, setSelectedNewsProvider] = useState(
    newsProviderFilters[0]
  );

  const { data, isLoading, isError } = useNews(selectedNewsProvider);

  function renderContent() {
    if (isLoading)
      return (
        <GridWrapper>
          {Array.from({ length: 12 }).map((_, index) => (
            <NewsCardLoader key={index} />
          ))}
        </GridWrapper>
      );

    if (!isLoading && !isError && !data?.data?.length)
      return (
        <Title mt={50} order={2} fw={700} ta="center">
          No news found
        </Title>
      );

    if (isError)
      return (
        <Title mt={50} order={2} fw={700} ta="center">
          Something went wrong
        </Title>
      );

    return (
      <GridWrapper>
        {data?.data?.map((news, index) => (
          <NewsCard key={index} {...news} />
        ))}
      </GridWrapper>
    );
  }

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
            Latest crypto news provided by:{" "}
            {capitalizeFirstLetter(selectedNewsProvider)}
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

          {renderContent()}
        </Box>
      </Container>
    </section>
  );
}

function GridWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SimpleGrid mt={50} spacing="xl" cols={{ base: 1, sm: 2, md: 3 }}>
      {children}
    </SimpleGrid>
  );
}
