interface IColumnHeader {
  Header: string;
  accessor: string;
}

type Columns = IColumnHeader[];

export const columnsDataDevelopment: Columns = [
  {
    Header: "COUNTRY",
    accessor: "country",
  },
  {
    Header: "TECH",
    accessor: "tech",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
  {
    Header: "PROGRESS",
    accessor: "progress",
  },
];

export const columnsDataCheck: Columns = [
  {
    Header: "NAME",
    accessor: "name",
  },
  // {
  //   Header: "PROGRESS",
  //   accessor: "progress",
  // },
  // {
  //   Header: "QUANTITY",
  //   accessor: "quantity",
  // },
  // {
  //   Header: "DATE",
  //   accessor: "date",
  // },
];

export const columnsDataColumns: Columns = [
  {
    Header: "COUNTRY",
    accessor: "country",
  },
  {
    Header: "PERIOD",
    accessor: "period",
    
  },
  {
    Header: "BCI",
    accessor: "bci",
  },
  {
    Header: "CCI",
    accessor: "cci",
  },
  {
    Header: "Government Reserves",
    accessor: "government_reserves",
  },
  {
    Header: "Industrial Production",
    accessor: "industrial_production",
  },
  {
    Header: "Inflation Growth Rate",
    accessor: "inflation_growth_rate",
  },
  {
    Header: "Long Term Interest",
    accessor: "long_term_interest",
  },
  {
    Header: "ppi Growth Rate",
    accessor: "ppi_growth_rate",
  },
  {
    Header: "Quarterly GDP",
    accessor: "qgdp",
  },
  {
    Header: "Share Price",
    accessor: "share_price",
  },
  {
    Header: "Short Term Interest",
    accessor: "short_term_interest",
  },
  {
    Header: "Trade In Goods",
    accessor: "trade_in_goods",
  },
  {
    Header: "Unemployment Rate",
    accessor: "unemployment_rate",
  },
];

export const columnsDataComplex: Columns = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "STATUS",
    accessor: "status",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
  {
    Header: "PROGRESS",
    accessor: "progress",
  },
];
