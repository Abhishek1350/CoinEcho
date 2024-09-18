import { Container } from "@mantine/core";
import classes from "./styles.module.css";
import { useSearchParams, Navigate } from "react-router-dom";
import { useCurrency } from "@/context/Currency-Context";
import { useCoinDetails } from "@/lib/useApi";

export default function CoinDetailsPage() {
  const [searchParams] = useSearchParams();
  const coin_uuid = searchParams.get("uuid");

  if (!coin_uuid) {
    Navigate({ to: "/", replace: true });
    return null;
  }

  const { selectedCurrency } = useCurrency();

  const { data: details, isLoading } = useCoinDetails(
    coin_uuid,
    { referenceCurrencyUuid: selectedCurrency.uuid }
  );

  console.log(details?.data.coin)

  if (isLoading) {
    return <Container size="lg">loading...</Container>;
  }


  return (
    <section className={classes.section}>
      <Container size="lg">coin details</Container>
    </section>
  );
}
