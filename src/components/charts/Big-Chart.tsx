import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    ReferenceLine,
} from "recharts";
import { formatCompactCurrency } from "@/lib/utils";
import { useCurrency } from "@/context/Currency-Context";
import { NumberFormatter } from "@mantine/core";

interface SmallChartProps {
    data: number[];
    duration: "24h" | "7d" | "30d";
}

const generateXAxisTicks = (
    duration: "24h" | "7d" | "30d",
    dataLength: number
) => {
    const ticks = [];
    const now = new Date();

    for (let i = 0; i < dataLength; i++) {
        let timeLabel = "";
        if (duration === "24h") {
            timeLabel = `${i}:00`;
        } else if (duration === "7d") {
            const date = new Date(now);
            date.setDate(now.getDate() - (dataLength - 1 - i));
            timeLabel = date.toLocaleDateString();
        } else if (duration === "30d") {
            const date = new Date(now);
            date.setDate(now.getDate() - (dataLength - 1 - i));
            timeLabel = date.toLocaleDateString();
        }
        ticks.push(timeLabel);
    }
    return ticks;
};

export function BigChart({ data, duration }: SmallChartProps) {
    const xAxisTicks = generateXAxisTicks(duration, data.length);

    const { selectedCurrency } = useCurrency();

    const chartDataPoints = data.map((price, index) => ({
        price,
        timestamp: xAxisTicks[index],
    }));

    const lineColor = data[data.length - 1] >= data[0] ? "#4caf50" : "#ff4c4c";

    const getPrice = (price: number) =>
        price < 1 ? (
            `${selectedCurrency.sign}${formatCompactCurrency(price)}`
        ) : (
            <NumberFormatter
                value={price}
                thousandSeparator
                decimalScale={price < 100 ? 2 : 0}
                prefix={selectedCurrency.sign}
            />
        );

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={chartDataPoints}
                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
            >
                <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e5e5e5"
                />
                <XAxis
                    dataKey="timestamp"
                    ticks={xAxisTicks}
                    tick={{ fontSize: 12, fill: "#a5a5a5" }}
                    axisLine={false}
                    tickLine={false}
                />
                <YAxis
                    hide
                    domain={[Math.min(...data), Math.max(...data)]}
                    allowDataOverflow
                    tick={{ fontSize: 12, fill: "#a5a5a5" }}
                />
                <Tooltip
                    formatter={(value: number) => [getPrice(value), "Price"]}
                    labelFormatter={(label: string) => `Time: ${label}`}
                    contentStyle={{ backgroundColor: "#fff", border: "1px solid #ccc" }}
                    labelStyle={{
                        color: data[data.length - 1] >= data[0] ? "#4caf50" : "#ff4c4c",
                    }}
                />
                <ReferenceLine
                    y={Math.max(...data)}
                    stroke="#ff4c4c"
                    label="Max Price"
                />
                <ReferenceLine
                    y={Math.min(...data)}
                    stroke="#00c0c0"
                    label="Min Price"
                />
                <Line
                    type="monotone"
                    dataKey="price"
                    stroke={lineColor}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
