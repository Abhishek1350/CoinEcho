import { Suspense, ComponentType, lazy } from "react";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import { MantineProvider } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import { Header, PageLoader } from "./components";
import { CurrencyProvider } from "@/context/Currency-Context.tsx";

const LazyHomePage = lazy(() => import("./pages/home"));
const CoinDetailsPage = lazy(() => import("./pages/coin-details"));

interface LazyPageProps {
  Component: ComponentType;
}

function LazyPage({ Component }: LazyPageProps) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}

export default function App() {
  return (
    <CurrencyProvider>
      <MantineProvider defaultColorScheme="auto">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<LazyPage Component={LazyHomePage} />} />
            <Route path="/coin-details" element={<LazyPage Component={CoinDetailsPage} />} />
          </Routes>
        </main>
      </MantineProvider>
    </CurrencyProvider>
  );
}
