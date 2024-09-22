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
} from "@/components";
import { coinDetailsTimelineFilters } from "@/config/filters";
import { useState } from "react";
import PageSkeleton from "./Page-Skeleton";
import { formatCompactCurrency } from "@/lib/utils";
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
          <Box className={classes.head}>
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

          <Box className={classes.chart}>

          </Box>
        </Box>
      </Container>
    </section>
  );
}
