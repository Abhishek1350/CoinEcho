import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import { MantineProvider } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/Home.page";
import { Header } from "./components";
import { CurrencyProvider } from "@/context/Currency-Context.tsx";

export default function App() {
  return (
    <CurrencyProvider>
      <MantineProvider defaultColorScheme="auto">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
      </MantineProvider>
    </CurrencyProvider>
  );
}
