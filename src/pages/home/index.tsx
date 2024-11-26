import {
  Container,
  Title,
  Text,
  SimpleGrid,
  NumberFormatter,
  Skeleton,
  Box,
  Grid,
  Stack,
  Divider,
} from "@mantine/core";
import classes from "./styles.module.css";
import {
  SearchInput,
  GlobalStatItem,
  CoinsContainer,
  StatsCoin,
  StatsCoinLoader,
} from "@/components";
import { useGlobalStats } from "@/lib/useApi";
import { formatCompactCurrency } from "@/lib/utils";
import { useCurrency } from "@/context/Currency-Context";
import { useSearchParams } from "react-router-dom";
import { useUserLikes } from "@/hooks/useUserLikes";

export default function HomePage() {
  const { selectedCurrency } = useCurrency();

  const [searchParams] = useSearchParams();

  const { data: globalStats, isLoading: isLoadingGlobalStats } = useGlobalStats(
    { referenceCurrencyUuid: selectedCurrency.uuid }
  );

  const { userLikes, isLoading: isLoadingUserLikes } = useUserLikes();

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

        <SimpleGrid cols={{ base: 1, sm: 3 }} maw={800} mx="auto" mt="xl">
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

        <Grid className={classes.coinsListWrapper} mt="xl">
          <Grid.Col span={{ base: 12, md: 9 }} className={classes.list}>
            <CoinsContainer
              selectedCurrency={selectedCurrency}
              totalCoins={totalCoins}
              key={searchParams.toString()}
            />
          </Grid.Col>

          <Grid.Col
            span={{ base: 12, md: 3 }}
            pt={6}
            pl="lg"
            className={classes.sidebar}
          >
            <Stack gap="lg">
              <Box>
                <Title order={4} mb="md">
                  Tredning on CoinEcho
                </Title>
                <Stack align="flex-start" justify="center" gap="sm">
                  {isLoadingGlobalStats
                    ? Array.from({ length: 3 }).map((_, i) => (
                      <StatsCoinLoader key={i} />
                    ))
                    : globalStats?.data?.bestCoins?.map((coin) => (
                      <StatsCoin key={coin.uuid} {...coin} />
                    ))}
                </Stack>
              </Box>

              <Divider />

              {userLikes?.length ? (
                <Box>
                  <Title order={4} mb="md">
                    Your Favorites
                  </Title>
                  <Stack align="flex-start" justify="center" gap="sm">
                    {isLoadingUserLikes
                      ? Array.from({ length: 3 }).map((_, i) => (
                        <StatsCoinLoader key={i} />
                      ))
                      : userLikes?.map((coin) => (
                        <StatsCoin key={coin.uuid} {...coin} />
                      ))}
                  </Stack>
                </Box>
              ) : (
                <Box>
                  <Title order={4} mb="md">
                    New on CoinEcho
                  </Title>
                  <Stack align="flex-start" justify="center" gap="sm">
                    {isLoadingGlobalStats
                      ? Array.from({ length: 3 }).map((_, i) => (
                        <StatsCoinLoader key={i} />
                      ))
                      : globalStats?.data?.newestCoins?.map((coin) => (
                        <StatsCoin key={coin.uuid} {...coin} />
                      ))}
                  </Stack>
                </Box>
              )}
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </section>
  );
}
