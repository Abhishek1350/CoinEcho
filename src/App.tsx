import { Suspense, ComponentType, lazy } from "react";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import { MantineProvider } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { CurrencyProvider } from "@/context/Currency-Context.tsx";

const LazyHomePage = lazy(() => import("./pages/Home.page"));

interface LazyPageProps {
  Component: ComponentType;
}

function LazyPage({ Component }: LazyPageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
          </Routes>
        </main>
      </MantineProvider>
    </CurrencyProvider>
  );
}
