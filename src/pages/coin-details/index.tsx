import {
  Container,
  Title,
  Text,
  Box,
  Group,
  SegmentedControl,
  NumberFormatter,
} from "@mantine/core";
import classes from "./styles.module.css";
import { useSearchParams, Navigate, Link } from "react-router-dom";
import { useCurrency } from "@/context/Currency-Context";
import { useCoinDetails, useGlobalStats } from "@/lib/useApi";
import {
  LazyImage,
  SearchInput,
  WishlistButton,
  ShareButton,
  BigChart,
} from "@/components";
import { coinDetailsTimelineFilters } from "@/config/filters";
import { useState } from "react";
import PageSkeleton from "./Page-Skeleton";
import {
  formatCompactCurrency,
  getReadableDateTime,
  prepareSparklineData,
} from "@/lib/utils";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";

export default function CoinDetailsPage() {
  const [searchParams] = useSearchParams();
  const coin_uuid = searchParams.get("uuid");
  const [selectedTimeline, setSelectedTimeline] = useState(
    coinDetailsTimelineFilters[0]
  );

  const [isLiked, setIsLiked] = useState(false);

  const { selectedCurrency } = useCurrency();

  if (!coin_uuid) {
    return <Navigate to="/" replace />;
  }

  const {
    data: details,
    isLoading,
    isError,
  } = useCoinDetails(coin_uuid, {
    referenceCurrencyUuid: selectedCurrency.uuid,
    timePeriod: selectedTimeline,
  });

  const { data: globalStats, isLoading: isLoadingGlobalStats } = useGlobalStats(
    { referenceCurrencyUuid: selectedCurrency.uuid }
  );

  const coin = details?.data.coin;

  if (isLoading || isLoadingGlobalStats) {
    return <PageSkeleton />;
  }

  if (isError) {
    return <Navigate to="/" replace />;
  }

  const priceItem =
    Number(coin?.price) < 1 ? (
      `${selectedCurrency.sign}${formatCompactCurrency(coin?.price)}`
    ) : (
      <NumberFormatter
        value={coin?.price}
        thousandSeparator
        decimalScale={Number(coin?.price) < 100 ? 2 : 0}
        prefix={selectedCurrency.sign}
      />
    );

  const PriceChange = () => (
    <Group>
      <Text c={Number(coin?.change) > 0 ? "teal" : "red"} fz="md" fw={500}>
        <span>{coin?.change}%</span>
        {Number(coin?.change) > 0 ? (
          <IconArrowUpRight size="1rem" stroke={1.5} />
        ) : (
          <IconArrowDownRight size="1rem" stroke={1.5} />
        )}
      </Text>
    </Group>
  );

  return (
    <section className={classes.section}>
      <Container size="lg">
        <Box className={classes.header}>
          <Group justify="space-between">
            <Link
              to={coin?.websiteUrl || ""}
              className={`${classes.coinName} text-secondary`}
              target="_blank"
              rel="noreferrer"
            >
              <Group gap={5}>
                <LazyImage
                  src={coin?.iconUrl || ""}
                  width={50}
                  alt={coin?.name}
                />
                <Title fw={700}>
                  {coin?.name} {coin?.symbol}
                </Title>
              </Group>
            </Link>

            <Group justify="center">
              <ShareButton />
              <WishlistButton
                isLiked={isLiked}
                onClick={() => setIsLiked(!isLiked)}
              />
              <SegmentedControl
                data={coinDetailsTimelineFilters}
                defaultValue={selectedTimeline}
                onChange={setSelectedTimeline}
                color="blue"
                className="bg-secondary"
              />
              <SearchInput
                size="md"
                totalCoins={globalStats?.data?.totalCoins}
              />
            </Group>
          </Group>
        </Box>

        <Box className={classes.content} mt={50}>
          <Group justify="space-between">
            <Box>
              <Text c="dimmed" size="lg" fw={500}>
                {coin?.symbol} Price
              </Text>
              <Group gap={5}>
                <Title fw={700} order={2}>
                  {priceItem}
                </Title>
                <PriceChange />
              </Group>
            </Box>

            <Box>
              <Text c="dimmed" size="lg" fw={500}>
                Highest{" "}
                <Text component="span">
                  ({getReadableDateTime(coin?.allTimeHigh?.timestamp)})
                </Text>
              </Text>
              <Title fw={700} order={2}>
                {
                  Number(coin?.allTimeHigh?.price) < 1 ? (
                    `$${formatCompactCurrency(coin?.allTimeHigh?.price)}`
                  ) : (
                    <NumberFormatter
                      value={coin?.allTimeHigh?.price}
                      thousandSeparator
                      decimalScale={Number(coin?.allTimeHigh?.price) < 100 ? 2 : 0}
                      prefix="$"
                    />
                  )
                }
              </Title>
            </Box>
          </Group>

          <Box className={classes.chart} mt={40}>
            <BigChart
              data={prepareSparklineData(coin?.sparkline!)}
              duration={selectedTimeline as "24h" | "7d" | "30d"}
            />
          </Box>

          <Box mt={50} size="lg">
            <Title fw={800} order={2} mb={5}>
              More About {coin?.name} {coin?.symbol}
            </Title>
            <Text mb={20} size="lg">
              {coin?.description}
            </Text>
            <StatsGroup
              fMCap={coin?.fullyDilutedMarketCap}
              mCap={coin?.marketCap}
              volume={coin?.["24hVolume"]}
              selectedCurrency={selectedCurrency.sign}
            />
          </Box>
        </Box>
      </Container>
    </section>
  );
}

function StatsGroup({
  selectedCurrency,
  volume = "",
  mCap = "",
  fMCap = "",
}: {
  selectedCurrency: string;
  volume: string | undefined;
  mCap: string | undefined;
  fMCap: string | undefined;
}) {
  const data = [
    {
      title: "24 Hours Volume",
      stats: volume,
    },
    {
      title: "Market Cap",
      stats: mCap,
    },
    {
      title: "Fully Diluted Market Cap",
      stats: fMCap,
    },
  ];

  const stats = data.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count} fw={700}>
        <NumberFormatter
          value={stat.stats}
          thousandSeparator
          decimalScale={Number(stat.stats) < 100 ? 2 : 0}
          prefix={selectedCurrency}
        />
      </Text>
      <Text className={classes.title} fw={700}>
        {stat.title}
      </Text>
    </div>
  ));

  return <div className={classes.StatGroup}>{stats}</div>;
}
