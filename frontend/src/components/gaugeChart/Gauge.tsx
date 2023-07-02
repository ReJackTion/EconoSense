import GaugeChart from "react-advanced-gauge-chart";
import { useColorModeValue } from "@chakra-ui/system";
import { checkHealth, transformRisk } from "utils/transformRisk";
import { Center } from "@chakra-ui/react";

export default function Gauge(props: { id: string; risk: number }) {
  const { id, risk } = props;
  let textColor = useColorModeValue("navy.700", "white");

  return (
    <>
      <GaugeChart
        id={id}
        nrOfLevels={20}
        percent={transformRisk(id, risk)}
        textColor={textColor}
        colors={["#FF0000", "#00FF00"]}
      />
      <Center>{checkHealth(id, risk)}</Center>
    </>
  );
}
