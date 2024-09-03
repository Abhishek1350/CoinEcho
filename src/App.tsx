import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/Home.page";
import { Header } from "./components";

export default function App() {
  return (
    <MantineProvider defaultColorScheme="auto">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </MantineProvider>
  );
}
