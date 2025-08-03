import { Fragment } from "react/jsx-runtime";
import { AiAnalysisModal } from "./modal";
import { useDisclosure } from "@mantine/hooks";
import { Button } from "@mantine/core";
import { IconRobot } from "@tabler/icons-react";
import { useState } from "react";
import { portfolioUrl, aiResponseUrl } from "@/config/env";
import { Coin } from "@/lib/types";
import { useCurrency } from "@/context";
import { parseStreamedResponse } from "@/lib/utils";
import { Markdown } from "./markdown";

interface AiAnalysisProps {
    coinData: Coin;
    timePeriod: string;
}

interface AiAnalysisState {
    loading: boolean;
    data: string;
}

const initialAiAnalysisState: AiAnalysisState = {
    loading: false,
    data: "",
};

function extractDataForAiAnalysis(data: Coin) {
    return {
        name: data.name,
        "24hVolume": data["24hVolume"],
        price: data.price,
        priceAt: data.priceAt,
        change: data.change,
        sparkline: data.sparkline,
        marketCap: data.marketCap,
        fullyDilutedMarketCap: data.fullyDilutedMarketCap,
        allTimeHigh: {
            ...data.allTimeHigh,
            allTimeHighCurrency: "USD",
        },
    };
}

export function AiAnalysis({ coinData, timePeriod }: AiAnalysisProps) {
    const [opened, { open, close }] = useDisclosure(false);
    const [aiAnalysisState, setAiAnalysisState] = useState<AiAnalysisState>(
        initialAiAnalysisState
    );

    const { selectedCurrency } = useCurrency();

    function handleClose() {
        setAiAnalysisState(initialAiAnalysisState);
        close();
    }

    async function handleOpen() {
        open();
        await getAiAnalysisState();
    }

    async function getAiAnalysisState() {
        if (aiAnalysisState.loading) return;
        setAiAnalysisState({ ...aiAnalysisState, loading: true });

        try {
            const response = await fetch(`${aiResponseUrl}/api/coin-echo/analyze`, {
                method: "POST",
                body: JSON.stringify({
                    coinData: extractDataForAiAnalysis(coinData),
                    currency: selectedCurrency.name,
                    timePeriod,
                }),
                headers: {
                    "Content-Type": "application/json",
                    "X-Portfolio": portfolioUrl,
                },
            });

            if (!response.body) throw new Error("No response body");

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");

            let done = false;
            let accumulatedData = "";

            while (!done) {
                const { value, done: readerDone } = await reader.read();
                done = readerDone;

                if (value) {
                    const chunkValue = decoder.decode(value);
                    accumulatedData += chunkValue;

                    setAiAnalysisState((prevState) => ({
                        ...prevState,
                        data: accumulatedData,
                    }));
                }
            }
        } catch (err) {
            console.error("Error fetching streamed content:", err);
            setAiAnalysisState((prevState) => ({
                ...prevState,
                loading: false,
            }));
        } finally {
            setAiAnalysisState((prevState) => ({
                ...prevState,
                loading: false,
            }));
        }
    }

    return (
        <Fragment>
            <Button
                onClick={handleOpen}
                leftSection={<IconRobot size={20} />}
                variant="outline"
                color="violet"
                loading={aiAnalysisState.loading}
            >
                AI Analysis
            </Button>
            {opened && aiAnalysisState.data && (
                <AiAnalysisModal
                    coinName={coinData.name}
                    isOpen={opened}
                    handleClose={handleClose}
                    size="lg"
                >
                    <Markdown content={parseStreamedResponse(aiAnalysisState.data)} />
                </AiAnalysisModal>
            )}
        </Fragment>
    );
}
