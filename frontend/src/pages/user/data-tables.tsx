import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "views/user/dataTables/components/DevelopmentTable";
import CheckTable from "views/user/dataTables/components/CheckTable";
import ColumnsTable from "views/user/dataTables/components/ColumnsTable";
import ComplexTable from "views/user/dataTables/components/ComplexTable";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "views/user/dataTables/variables/columnsData";
import tableDataDevelopment from "views/user/dataTables/variables/tableDataDevelopment.json";
import tableDataCheck from "views/user/dataTables/variables/tableDataCheck.json";
import tableDataColumns from "views/user/dataTables/variables/tableDataColumns.json";
import tableDataComplex from "views/user/dataTables/variables/tableDataComplex.json";
import React from "react";
import UserLayout from "layouts/user";
import { TableData } from "views/user/default/variables/columnsData";
import TestTable from "views/user/dataTables/components/TestTable";

export default function DataTables() {
  const fake_data = [
    {
      period: "2023-01-01",
      country: "Argentina",
      bci: 0,
      bci_nor: 0,
      bci_pc: 0,
      cci: 0,
      cci_nor: 0,
      cci_pc: 0,
      government_reserves: 0,
      government_reserves_nor: 0,
      government_reserves_pc: 0,
      industrial_production: 0,
      industrial_production_nor: 0,
      industrial_production_pc: 0,
      inflation_growth_rate: 0,
      inflation_growth_rate_nor: 0,
      inflation_growth_rate_pc: 0,
      long_term_interest: 98.82909,
      long_term_interest_nor: 51.28362119727841,
      long_term_interest_pc: 4.257595324895713,
      ppi_growth_rate: 0,
      ppi_growth_rate_nor: 0,
      ppi_growth_rate_pc: 0,
      qgdp: 0,
      qgdp_nor: 0,
      qgdp_pc: 0,
      share_price: 0,
      share_price_nor: 0,
      share_price_pc: 0,
      short_term_interest: 0,
      short_term_interest_nor: 28.640179766305724,
      short_term_interest_pc: 0,
      trade_in_goods: 0,
      trade_in_goods_nor: 0,
      trade_in_goods_pc: 0,
      unemployment_rate: 0,
      unemployment_rate_nor: 0,
      unemployment_rate_pc: 0,
      id: 36203,
    },
    {
      period: "2023-02-01",
      country: "Malaysia",
      bci: 0,
      bci_nor: 0,
      bci_pc: 0,
      cci: 0,
      cci_nor: 0,
      cci_pc: 0,
      government_reserves: 0,
      government_reserves_nor: 0,
      government_reserves_pc: 0,
      industrial_production: 0,
      industrial_production_nor: 0,
      industrial_production_pc: 0,
      inflation_growth_rate: 0,
      inflation_growth_rate_nor: 0,
      inflation_growth_rate_pc: 0,
      long_term_interest: 102.5008,
      long_term_interest_nor: 49.327619244741854,
      long_term_interest_pc: 3.7152117863272993,
      ppi_growth_rate: 0,
      ppi_growth_rate_nor: 0,
      ppi_growth_rate_pc: 0,
      qgdp: 0,
      qgdp_nor: 0,
      qgdp_pc: 0,
      share_price: 0,
      share_price_nor: 0,
      share_price_pc: 0,
      short_term_interest: 0,
      short_term_interest_nor: 28.640179766305724,
      short_term_interest_pc: 0,
      trade_in_goods: 0,
      trade_in_goods_nor: 0,
      trade_in_goods_pc: 0,
      unemployment_rate: 0,
      unemployment_rate_nor: 0,
      unemployment_rate_pc: 0,
      id: 36255,
    },
  ];

  return (
    <UserLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        {/* <SimpleGrid
          mb="20px"
          columns={{ sm: 1, md: 2 }}
          spacing={{ base: "20px", xl: "20px" }}
        > */}
        {/* <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment as unknown as TableData[]}
        /> */}
        {/* <CheckTable
          columnsData={columnsDataCheck}
          tableData={tableDataCheck as unknown as TableData[]}
        /> */}
        {/* <ColumnsTable
          columnsData={columnsDataColumns}
          // tableData={tableDataColumns as unknown as TableData[]}
          tableData={fake_data as unknown as any}
        /> */}
        <TestTable data={fake_data} columns={columnsDataColumns} />
        {/* <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex as unknown as TableData[]}
        /> */}
        {/* </SimpleGrid> */}
      </Box>
    </UserLayout>
  );
}
