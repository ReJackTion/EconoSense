import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Indicator_API from "services/indicator.service";
import IndicatorsHeading from "./IndicatorHeading";

import MiniStatistics from "components/card/MiniStatistics";
import Card from "components/card/Card";

interface Props {
  selected_country: string;
  selected_period: string;
}

export default function Indicators(props: Props) {
  const { selected_country, selected_period } = props;
  const { data, error, isLoading } = useSWR(
    `${selected_country}?start_date=${selected_period}&end_date=${selected_period}`,
    Indicator_API.getMonthIndicators
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
          growth={data[0].share_price_pc}
          name="Share prices – Total – 2015=100"
          value={data[0].share_price}
          id="share_price"
          risk={data[0].share_price_nor}
        />
        <MiniStatistics
          growth={data[0].bci_pc}
          name="Business confidence index (BCI) – Amplitude adjusted – Long-term average = 100"
          value={data[0].bci}
          id="bci"
          risk={data[0].bci_nor}
        />
        <MiniStatistics
          growth={data[0].cci_pc}
          name="Consumer confidence index (CCI) – Amplitude adjusted – Long-term average = 100"
          value={data[0].cci}
          id="cci"
          risk={data[0].cci_nor}
        />
        <MiniStatistics
          growth={data[0].ppi_growth_rate_pc}
          name="Producer price indices (PPI) – Manufacturing, total market – Annual growth rate (%)"
          value={data[0].ppi_growth_rate}
          id="ppi"
          risk={data[0].ppi_growth_rate_nor}
        />
        <MiniStatistics
          growth={data[0].long_term_interest_pc}
          name="Long-term interest rates – Total – % per annum"
          value={data[0].long_term_interest}
          id="long_term_interest"
          risk={data[0].long_term_interest_nor}
        />
        <MiniStatistics
          growth={data[0].short_term_interest_pc}
          name="Short-term interest rates – Total – % per annum"
          value={data[0].short_term_interest}
          id="short_term_interest"
          risk={data[0].short_term_interest_nor}
        />
      </Card>
      <Card py="15px">
        <IndicatorsHeading title="Coincident Indicators" />
        <MiniStatistics
          growth={data[0].qgdp_pc}
          name="Quarterly GDP – Total – Percentage change, previous period – Quarterly"
          value={data[0].qgdp}
          id="qgdp"
          risk={data[0].qgdp_nor}
        />
        <MiniStatistics
          growth={data[0].industrial_production_pc}
          name="Industrial production – Total – 2015=100"
          value={data[0].industrial_production}
          id="industrial_production"
          risk={data[0].industrial_production_nor}
        />
      </Card>
      <Card py="15px">
        <IndicatorsHeading title="Lagging Indicators" />
        <MiniStatistics
          growth={data[0].inflation_growth_rate_pc}
          name="Inflation (CPI) – Total – Annual growth rate (%)"
          value={data[0].inflation_growth_rate}
          id="inflation_growth_rate"
          risk={data[0].inflation_growth_rate_nor}
        />
        <MiniStatistics
          growth={data[0].unemployment_rate_pc}
          name="Unemployment rate – Total – % of labour force"
          value={data[0].unemployment_rate}
          id="unemployment_rate"
          risk={data[0].unemployment_rate_nor}
        />
        <MiniStatistics
          growth={data[0].trade_in_goods_pc}
          name="Trade in goods – Net trade – Billion US dollars"
          value={data[0].trade_in_goods}
          id="trade_in_goods"
          risk={data[0].trade_in_goods_nor}
        />
        <MiniStatistics
          growth={data[0].government_reserves_pc}
          name="Government reserves – Total – SDR millions"
          value={data[0].government_reserves}
          id="government_reserves"
          risk={data[0].government_reserves_nor}
        />
      </Card>
    </>
  );
}
