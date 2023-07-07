import NumberRangeColumnFilter from "components/input/numberRange";

interface IColumnHeader {
  Header: string;
  accessor: string;
  Filter? : any;
  filter?: string;
  disableFilters?: boolean;
  Cell?: any;
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
    Header: "Country",
    accessor: "country",
  },
  {
    Header: "Period",
    accessor: "period",
    
  },
  {
    Header: "Business confidence index",
    accessor: "bci",
    Filter: NumberRangeColumnFilter,
    filter: 'between',
    disableFilters: true,
    Cell: ({ value }) => (value === 0 ? "Null" : value),
  },
  {
    Header: "Consumer confidence index",
    accessor: "cci",
    Filter: NumberRangeColumnFilter,
    filter: 'between',
    disableFilters: true,
    Cell: ({ value }) => (value === 0 ? null : value),
  },
  {
    Header: "Government Reserves",
    accessor: "government_reserves",
    Filter: NumberRangeColumnFilter,
    filter: 'between',
    disableFilters: true,
    Cell: ({ value }) => (value === 0 ? null : value),
  },
  {
    Header: "Industrial Production",
    accessor: "industrial_production",
    Filter: NumberRangeColumnFilter,
    filter: 'between',
    disableFilters: true,
    Cell: ({ value }) => (value === 0 ? null : value),
  },
  {
    Header: "Inflation Growth Rate",
    accessor: "inflation_growth_rate",
    Filter: NumberRangeColumnFilter,
    filter: 'between',
    disableFilters: true,
    Cell: ({ value }) => (value === 0 ? null : value),
  },
  {
    Header: "Long Term Interest",
    accessor: "long_term_interest",
    Filter: NumberRangeColumnFilter,
    filter: 'between',
    disableFilters: true,
    Cell: ({ value }) => (value === 0 ? null : value),
  },
  {
    Header: "Producer price indices",
    accessor: "ppi_growth_rate",
    Filter: NumberRangeColumnFilter,
    filter: 'between',
    disableFilters: true,
    Cell: ({ value }) => (value === 0 ? null : value),
  },
  {
    Header: "Quarterly GDP",
    accessor: "qgdp",
    Filter: NumberRangeColumnFilter,
    filter: 'between',
    disableFilters: true,
    Cell: ({ value }) => (value === 0 ? null : value),
  },
  {
    Header: "Share Price",
    accessor: "share_price",
    Filter: NumberRangeColumnFilter,
    filter: 'between',
    disableFilters: true,
    Cell: ({ value }) => (value === 0 ? null : value),
  },
  {
    Header: "Short Term Interest",
    accessor: "short_term_interest",
    Filter: NumberRangeColumnFilter,
    filter: 'between',
    disableFilters: true,
    Cell: ({ value }) => (value === 0 ? null : value),
  },
  {
    Header: "Trade In Goods",
    accessor: "trade_in_goods",
    Filter: NumberRangeColumnFilter,
    filter: 'between',
    disableFilters: true,
    Cell: ({ value }) => (value === 0 ? null : value),
  },
  {
    Header: "Unemployment Rate",
    accessor: "unemployment_rate",
    Filter: NumberRangeColumnFilter,
    filter: 'between',
    disableFilters: true,
    Cell: ({ value }) => (value === 0 ? null : value),
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
