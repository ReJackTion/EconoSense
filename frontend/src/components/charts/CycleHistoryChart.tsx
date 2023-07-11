import React from "react";
import dynamic from "next/dynamic";
import { ChartOptions } from "apexcharts";

// Load ApexCharts dynamically (to prevent server-side rendering issues)
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

interface EconomicCycleGraphProps {
  dates: string[];
  stages: string[];
}

const CycleHistoryChart: React.FC<EconomicCycleGraphProps> = ({
  dates,
  stages,
}) => {
  let cumulativeValue = 0;
  const data = dates.map((date, index) => {
    let value = 0;
    switch (stages[index]) {
      case "expansion":
        value = cumulativeValue + 1;
        break;
      case "contraction":
        value = cumulativeValue - 1;
        break;
      default:
        value = cumulativeValue;
    }
    cumulativeValue = value;
    return {
      x: date,
      y: value,
    };
  });

  const options: ChartOptions = {
    chart: {
      type: "line",
    },
    series: [
      {
        name: "Economic Cycle",
        data: data,
      },
    ],
    xaxis: {
      type: "category",
      categories: dates,
    },
    yaxis: {
      labels: {
        formatter: (value: number) => `${value}`,
      },
    },
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <ApexCharts
        options={options}
        series={options.series}
        type="line"
        // height={350}
        width={900}
        // height="150%"
      />
    </div>
  );
};

export default CycleHistoryChart;
