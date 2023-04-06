import GaugeChart from "react-advanced-gauge-chart";
import { useColorModeValue } from "@chakra-ui/system";

export default function Gauge(props: { id: string; risk: number }) {
  const { id, risk } = props;
  let textColor = useColorModeValue("navy.700", "white");

  return (
    <GaugeChart
      id={id}
      nrOfLevels={3}
      percent={(risk / 100).toFixed(2)}
      textColor={textColor}
    />
  );
}
