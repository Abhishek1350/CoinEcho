import { Sparkline } from "@mantine/charts";

export function SmallChart({ data: chartData }: { data: number[] }) {
    const minValue = Math.min(...chartData);
    const maxValue = Math.max(...chartData);
    const valueRange = maxValue - minValue;
    const normalizedChartData = chartData.map(
        (value) => ((value - minValue) / valueRange) * 100
    );

    return (
        <Sparkline
            w={150}
            h={60}
            data={normalizedChartData}
            trendColors={{ positive: "teal.6", negative: "red.6", neutral: "gray.5" }}
            fillOpacity={0.5}
            strokeWidth={2}
        />
    );
}
