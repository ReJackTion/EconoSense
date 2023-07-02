import React from "react";
import dynamic from "next/dynamic";
import { ChartOptions } from "apexcharts";
import { Center } from "@chakra-ui/react";
import { lineChartOptionsTotalSpent } from "variables/charts";

// Load ApexCharts dynamically (to prevent server-side rendering issues)
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

interface EconomicCycleGraphProps {
  currentStage: string;
  stage_prob: number[];
}

const EconomicCycleGraph: React.FC<EconomicCycleGraphProps> = ({
  currentStage,
  stage_prob,
}) => {
  const options: ChartOptions = {
    chart: {
      type: "line",
    },
    series: [
      {
        name: "Economic Cycle",
        data: stage_prob,
      },
    ],
    // labels: ["Peak", "Contraction", "Trough", "Expansion"],
    xaxis: {
      categories: ["Peak", "Contraction", "Trough", "Expansion"],
    },
    yaxis: {
      labels: {
        formatter: (value: number) => `${value}%`,
      },
    },
    stroke: {
      curve: "smooth",
    },
  };

  return (
    <>
      <Center marginBottom={50} fontSize={20} fontWeight={"bold"}>
        Economic cycle stage probability:
      </Center>
      <ApexCharts
        options={options}
        series={options.series}
        type="line"
        width="100%"
        height="150%"
      />
      <Center marginBottom={50}>Most possible Stage: {currentStage}</Center>
    </>
  );
};

export default EconomicCycleGraph;
