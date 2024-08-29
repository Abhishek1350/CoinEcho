import { Welcome, ColorSchemeToggle } from "@/components";
import { useGetAllCoinsQuery } from "@/services/coins.api";

export function HomePage() {
  const { data, isLoading } = useGetAllCoinsQuery(undefined);

  if (isLoading) return <p>Loading...</p>;

  console.log(data);
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
    </>
  );
}
