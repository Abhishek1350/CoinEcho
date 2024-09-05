import {
  Container,
  Title,
  Text,
  SimpleGrid,
  NumberFormatter,
} from "@mantine/core";
import classes from "./Home.module.css";
import { SearchInput, GlobalStatItem } from "@/components";
import { useGlobalStats } from "@/lib/useApi";
import { formatCompactCurrency } from "@/lib/utils";

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
            <GlobalStatItem
              key={stat.label}
              value={stat.value}
              label={stat.label}
              progress={stat.progress}
              color={stat.color}
            />
          ))}
        </SimpleGrid>
        <SearchInput totalCoins={totalCoins} />
      </Container>
    </section>
  );
}
