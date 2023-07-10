import {
  Box,
  SimpleGrid,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
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

import useSWR from "swr";
import Indicator_API from "services/indicator.service";

import { useSession } from "next-auth/react";

export default function DataTables() {
  const { data: session } = useSession();
  const [country, setCountry] = useState("United States");
  const monthIndex = String(new Date().getMonth() - 1).padStart(2, "0");
  const yearIndex = new Date().getFullYear();
  const latestPeriod = `${yearIndex}-${monthIndex}-01`;
  const [endPeriod, setEndPeriod] = useState(latestPeriod);
  const [startPeriod, setStartPeriod] = useState("1941-01-01");

  const countryOnChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = event.target;
    setCountry(value);
  };

  const startPeriodOnChangeHandler = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const { value, name } = event.target;
    setStartPeriod(value);
  };

  const endPeriodOnChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = event.target;
    setEndPeriod(value);
  };

  const { data, error, isLoading } = useSWR(
    `${country}?start_date=${startPeriod}&end_date=${endPeriod}`,
    Indicator_API.getMonthIndicators
  );

  return (
    <UserLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        {session ? (
          <>
            <SelectCountry
              country={country}
              onChange={(event) => countryOnChangeHandler(event)}
            />
            <SelectPeriod
              period={startPeriod}
              onChange={(event) => startPeriodOnChangeHandler(event)}
              title="Start Date"
            />
            <SelectPeriod
              period={endPeriod}
              onChange={(event) => endPeriodOnChangeHandler(event)}
              title="End Date"
            />
            {error ? (
              <div>Failed to load, data is not available yet.</div>
            ) : (
              <></>
            )}
            {isLoading ? (
              <Alert status="warning">
                <AlertIcon />
                Seems like data loading is slow, please wait...
              </Alert>
            ) : (
              <TestTable data={data} columns={columnsDataColumns} />
            )}
          </>
        ) : (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Your are not sign in!</AlertTitle>
            <AlertDescription>
              This is a protected page, please sign in to visit.
            </AlertDescription>
          </Alert>
        )}
      </Box>
    </UserLayout>
  );
}
