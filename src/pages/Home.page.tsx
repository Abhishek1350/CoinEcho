import {
  Container,
  Title,
  Text,
  SimpleGrid,
  NumberFormatter,
  Skeleton,
  Box,
} from "@mantine/core";
import classes from "./Home.module.css";
import { SearchInput, GlobalStatItem, CoinsContainer } from "@/components";
import { useGlobalStats } from "@/lib/useApi";
import { formatCompactCurrency } from "@/lib/utils";
import { useCurrency } from "@/context/Currency-Context";

export function HomePage() {
  const { selectedCurrency } = useCurrency();

  const { data: globalStats, isLoading: isLoadingGlobalStats } = useGlobalStats(
    { referenceCurrencyUuid: selectedCurrency.uuid }
  );

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
          mt={5}
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

        <Box mt="lg">
          <SearchInput totalCoins={totalCoins} />
        </Box>

        <SimpleGrid
          cols={{ base: 1, sm: 3 }}
          maw={800}
          mx="auto"
          mt="xl"
          mb="lg"
        >
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

        <CoinsContainer
          selectedCurrency={selectedCurrency}
          totalCoins={totalCoins}
        />
      </Container>
    </section>
  );
}
