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
import React, { useState, ChangeEvent } from "react";
import UserLayout from "layouts/user";
import { TableData } from "views/user/default/variables/columnsData";
import TestTable from "views/user/dataTables/components/TestTable";
import SelectCountry from "components/dropdown/SelectCountry";
import SelectPeriod from "components/dropdown/SelectPeriod";
import { fakeData } from "utils/fakeData";

export default function DataTables() {
  const [country, setCountry] = useState("United States");
  const monthIndex = String(new Date().getMonth() - 1).padStart(2, "0");
  const yearIndex = new Date().getFullYear();
  const latestPeriod = `${yearIndex}-${monthIndex}-01`;
  const [period, setPeriod] = useState(latestPeriod);

  const countryOnChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = event.target;
    setCountry(value);
  };

  const periodOnChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = event.target;
    setPeriod(value);
  };

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
        <SelectCountry
          country={country}
          onChange={(event) => countryOnChangeHandler(event)}
        />
        <SelectPeriod
          period={period}
          onChange={(event) => periodOnChangeHandler(event)}
        />
        <TestTable data={fakeData} columns={columnsDataColumns} />
        {/* <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex as unknown as TableData[]}
        /> */}
        {/* </SimpleGrid> */}
      </Box>
    </UserLayout>
  );
}
