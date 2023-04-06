import GaugeChart from "react-advanced-gauge-chart";

export default function Gauge(props: { id: string; risk: number }) {
  const { id, risk } = props;

  return <GaugeChart id={id} nrOfLevels={3} percent={risk} />;
}
