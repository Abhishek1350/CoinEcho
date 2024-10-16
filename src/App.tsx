import { Suspense, ComponentType, lazy } from "react";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import { MantineProvider } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import { Header, PageLoader, ScrollToTop } from "./components";
import { CurrencyProvider, AuthModalProvider, AuthProvider } from "@/context";

const LazyHomePage = lazy(() => import("./pages/home"));
const CoinDetailsPage = lazy(() => import("./pages/coin-details"));
const NewsPage = lazy(() => import("./pages/news"));

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
  console.log("run")
  return (
    <AuthProvider>
      <AuthModalProvider>
        <CurrencyProvider>
          <MantineProvider defaultColorScheme="auto">
            <Header />
            <main>
              <Routes>
                <Route
                  path="/"
                  element={<LazyPage Component={LazyHomePage} />}
                />
                <Route
                  path="/coin-details"
                  element={<LazyPage Component={CoinDetailsPage} />}
                />
                <Route
                  path="/latest-news"
                  element={<LazyPage Component={NewsPage} />}
                />
              </Routes>
            </main>
            <ScrollToTop/>
          </MantineProvider>
        </CurrencyProvider>
      </AuthModalProvider>
    </AuthProvider>
  );
}
