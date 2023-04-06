import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Indicator_API from "services/indicator.service";
import IndicatorsHeading from "./IndicatorHeading";

import MiniStatistics from "components/card/MiniStatistics";
import Card from "components/card/Card";

interface Props {
  selected_country: string;
}

export default function Indicators(props: Props) {
  const { selected_country } = props;
  const { data, error, isLoading } = useSWR(
    selected_country,
    Indicator_API.getLatestIndicators
  );

  useEffect(() => {
    console.log("swr data:", data);
    console.log("swr error", error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, selected_country]);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <Card py="15px">
        <IndicatorsHeading title="Leading Indicators" />
        <MiniStatistics
          growth="+21%"
          name="BCI"
          value="101.2"
          id="id1"
          risk={0.4}
        />
        <MiniStatistics
          growth="+22%"
          name="CCI"
          value="104.5"
          id="id2"
          risk={0.5}
        />
        <MiniStatistics
          growth="+23%"
          name="CPI"
          value="120.9"
          id="id3"
          risk={0.6}
        />
      </Card>
      <Card py="15px">
        <IndicatorsHeading title="Coincident Indicators" />
      </Card>
      <Card py="15px">
        <IndicatorsHeading title="Lagging Indicators" />
      </Card>
    </>
  );
}
