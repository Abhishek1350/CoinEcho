import { Welcome, ColorSchemeToggle } from "@/components";
import { useAllCoins } from "@/lib/useApi";

export function HomePage() {
  const { data } = useAllCoins();
  console.log(data);
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
    </>
  );
}
