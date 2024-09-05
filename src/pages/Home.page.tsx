import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Paper,
  Group,
  RingProgress,
  Center,
  NumberFormatter,
} from "@mantine/core";
import classes from "./Home.module.css";
import { SearchInput } from "@/components";
import { useGlobalStats } from "@/lib/useApi";
import { formatCompactCurrency } from "@/lib/utils";
import { IconArrowUpRight } from "@tabler/icons-react";

export function HomePage() {
  const { data: globalStats, isLoading: isLoadingGlobalStats } =
    useGlobalStats();

  const { totalCoins, totalMarketCap, total24hVolume, btcDominance } =
    globalStats?.data || {};

  const globalStatsMapping = [
    {
      label: "Market Cap",
      value: formatCompactCurrency(totalMarketCap) || "...",
      progress: 85,
      color: "blue",
    },
    {
      label: "24h Volume",
      value: formatCompactCurrency(total24hVolume) || "...",
      progress: 70,
      color: "teal",
    },
    {
      label: "Bitcoin Dominance",
      value: (
        <NumberFormatter
          value={btcDominance || "..."}
          suffix="%"
          decimalScale={4}
        />
      ),
      progress: 70,
      color: "orange",
    },
  ];

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
        <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="sm">
          CoinEcho is now tracking{" "}
          {isLoadingGlobalStats ? (
            "..."
          ) : (
            <NumberFormatter value={totalCoins} thousandSeparator />
          )}{" "}
          Cryptocurrencies
        </Text>
        <SimpleGrid cols={{ base: 1, sm: 3 }} maw={800} mx="auto" my="xl">
          {globalStatsMapping.map((stat) => (
            <Paper
              withBorder
              radius="md"
              p="xs"
              key={stat.label}
              className="bg-secondary"
            >
              <Group>
                <RingProgress
                  size={80}
                  roundCaps
                  thickness={8}
                  sections={[{ value: stat.progress, color: stat.color }]}
                  label={
                    <Center>
                      <IconArrowUpRight size={20} stroke={1.5} />
                    </Center>
                  }
                />
                <div>
                  <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                    {stat.label}
                  </Text>
                  <Text fw={700} size="xl">
                    {stat?.value}
                  </Text>
                </div>
              </Group>
            </Paper>
          ))}
        </SimpleGrid>
        <SearchInput />
      </Container>
    </section>
  );
}
