import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { Center } from "@chakra-ui/react";
import { lineChartOptionsTotalSpent } from "variables/charts";

// Load ApexCharts dynamically (to prevent server-side rendering issues)
const ReactApexCharts = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface EconomicCycleGraphProps {
  currentStage: string;
  stage_prob: number[];
}

const EconomicCycleGraph: React.FC<EconomicCycleGraphProps> = ({
  currentStage,
  stage_prob,
}) => {
  const options: ApexOptions = {
    chart: {
      type: "bar",
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
    // stroke: {
    //   curve: "smooth",
    // },
  };

  return (
    <>
      <Center marginBottom={50} fontSize={20} fontWeight={"bold"}>
        Economic cycle stage probability:
      </Center>
      <ReactApexCharts
        options={options}
        series={options.series}
        type="bar"
        width="100%"
        height="150%"
      />
      <Center marginBottom={50}>Most possible Stage: {currentStage}</Center>
    </>
  );
};

export default EconomicCycleGraph;
