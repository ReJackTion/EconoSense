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
import { fakeData } from "utils/fakeData";

export default function DataTables() {
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
