import {
  Container,
  Title,
  Text,
  SimpleGrid,
  NumberFormatter,
  Skeleton,
} from "@mantine/core";
import classes from "./Home.module.css";
import { SearchInput, GlobalStatItem, CoinsTable } from "@/components";
import { useGlobalStats, useAllCoins } from "@/lib/useApi";
import { formatCompactCurrency } from "@/lib/utils";
import { useCurrency } from "@/context/Currency-Context";

export function HomePage() {
  const { selectedCurrency } = useCurrency();

  const { data: globalStats, isLoading: isLoadingGlobalStats } = useGlobalStats(
    { referenceCurrencyUuid: selectedCurrency.uuid }
  );

  const { data: coins, isLoading } = useAllCoins({
    referenceCurrencyUuid: selectedCurrency.uuid,
    limit: 20,
  });

  const { totalCoins, totalMarketCap, total24hVolume, btcDominance } =
    globalStats?.data || {};

  const globalStatsMapping = [
    {
      label: "Market Cap",
      value: totalMarketCap ? (
        `${selectedCurrency.sign}${formatCompactCurrency(totalMarketCap)}`
      ) : (
        <Skeleton h={20} mt={7} />
      ),
      progress: 85,
      color: "blue",
    },
    {
      label: "24h Volume",
      value: total24hVolume ? (
        `${selectedCurrency.sign}${formatCompactCurrency(total24hVolume)}`
      ) : (
        <Skeleton h={20} mt={7} />
      ),
      progress: 70,
      color: "teal",
    },
    {
      label: "Bitcoin Dominance",
      value: btcDominance ? (
        <NumberFormatter
          value={btcDominance || "..."}
          suffix="%"
          decimalScale={4}
        />
      ) : (
        <Skeleton h={20} mt={7} />
      ),
      progress: btcDominance ? btcDominance : 50,
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
        <Text
          c="dimmed"
          ta="center"
          size="lg"
          maw={580}
          mx="auto"
          mt="sm"
          fw={600}
        >
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
        <CoinsTable
          coins={coins?.data.coins}
          isLoading={isLoading}
          selectedCurrency={selectedCurrency}
        />
      </Container>
    </section>
  );
}
