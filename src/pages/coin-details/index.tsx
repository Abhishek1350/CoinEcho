import { Container, Title, Box, Group, SegmentedControl } from "@mantine/core";
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

export default function CoinDetailsPage() {
  const [searchParams] = useSearchParams();
  const coin_uuid = searchParams.get("uuid");
  const [selectedTimeline, setSelectedTimeline] = useState(
    coinDetailsTimelineFilters[0]
  );

  const [isLiked, setIsLiked] = useState(false);

  if (!coin_uuid) {
    Navigate({ to: "/", replace: true });
    return null;
  }

  const { selectedCurrency } = useCurrency();

  const { data: details, isLoading } = useCoinDetails(coin_uuid, {
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis repudiandae, quidem corporis quibusdam porro reprehenderit iusto rerum, doloribus maxime adipisci culpa quod. Repellat quod molestias, natus eaque aperiam ducimus obcaecati!
        </Box>
      </Container>
    </section>
  );
}
