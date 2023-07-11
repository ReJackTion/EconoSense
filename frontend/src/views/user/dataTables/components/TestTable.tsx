/* eslint-disable react/jsx-key */
import React, { useState, useMemo } from "react";
import { useTable, useFilters, useSortBy, usePagination } from "react-table";
import { CSVLink } from "react-csv";
import Card from "components/card/Card";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { FcDownload } from "react-icons/fc";
import ValueRangeColumnFilter from "components/input/slider";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

import NumberRangeGlobalFilter from "components/input/globalRange";
import NumberRangeColumnFilter from "components/input/numberRange";

import useSWR from "swr";
import Indicator_API from "services/indicator.service";

import CycleHistoryChart from "components/charts/CycleHistoryChart";

import {
  Box,
  Stack,
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Tfoot,
  Checkbox,
  Input,
  useColorModeValue,
  Center,
  Select,
  HStack,
} from "@chakra-ui/react";

interface Column {
  Header: string;
  accessor: string;
  sortType?: "basic" | "date";
}

interface TableProps {
  data: any[];
  columns: Column[];
}

const TestTable: React.FC<TableProps> = ({ data, columns }) => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map((column) => column.accessor)
  );

  const DefaultColumnFilter: React.FC<{ column: any }> = ({ column }) => {
    const { filterValue, setFilter } = column;
    return (
      <Input
        size="sm"
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter..."
      />
    );
  };

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
    allColumns,
    getToggleHideAllColumnsProps,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: data.length ? data : null,
      initialState: { pageIndex: 0 },
      defaultColumn,
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const toggleColumnVisibility = (columnId: string) => {
    if (visibleColumns.includes(columnId)) {
      setVisibleColumns(visibleColumns.filter((col) => col !== columnId));
    } else {
      setVisibleColumns([...visibleColumns, columnId]);
    }
  };

  const getVisibleColumns = () =>
    columns.filter((column) => visibleColumns.includes(column.accessor));

  const csvHeaders = getVisibleColumns().map((column) => column.Header);
  const csvData = rows.map((row) =>
    getVisibleColumns().map((column) => row.values[column.accessor])
  );

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const extractedData: any = data.map(({ period, prediction }) => ({
    period,
    prediction,
  }));

  const dates = extractedData.map(({ period }) => period);
  const stages = extractedData.map(({ prediction }) => prediction);

  return (
    <>
      <Card
        flexDirection="column"
        w="100%"
        px="0px"
        overflowX={{ sm: "scroll", lg: "scroll" }}
      >
        <Flex px="25px" justify="space-between" mb="20px" align="center">
          <Text
            color={textColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
          >
            Economic cycle histoty chart
          </Text>
        </Flex>
        <CycleHistoryChart dates={dates} stages={stages} />
      </Card>
      <Card
        flexDirection="column"
        w="100%"
        px="0px"
        overflowX={{ sm: "scroll", lg: "scroll" }}
      >
        {/* <HStack mb={4}>
        <Text>Filter by Range:</Text>
        <NumberRangeGlobalFilter
          filterValue={state.globalFilter}
          setFilter={setGlobalFilter}
        />
      </HStack> */}
        <Flex px="25px" justify="space-between" mb="20px" align="center">
          <Text
            color={textColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
          >
            Query Data Table
          </Text>
        </Flex>

        <Box mx={6} marginBottom={4}>
          <div>
            <label>Selected Columns: </label>
            {columns.map((column) => (
              <label key={column.accessor}>
                <Flex align="center">
                  <Checkbox
                    defaultChecked={true}
                    colorScheme="brandScheme"
                    me="10px"
                    checked={visibleColumns.includes(column.accessor)}
                    onChange={() => toggleColumnVisibility(column.accessor)}
                  />
                  <Text color={textColor} fontSize="sm" fontWeight="700">
                    {column.Header}
                  </Text>
                  {/* <Input
                  type="text"
                  onChange={(e) =>
                    handleFilterChange(column.accessor, e.target.value)
                  }
                  // size="xs"
                  htmlSize={4}
                  width="70%"
                  fontSize="sm"
                  variant="auth"
                  placeholder="Search ... "
                  id={column.accessor}
                /> */}
                </Flex>
              </label>
            ))}
          </div>
        </Box>

        <Box my={4} mx={6}>
          <Stack direction="row" spacing={4}>
            <CSVLink
              data={csvData}
              headers={csvHeaders}
              filename="EconoSense-data-table.csv"
            >
              <Button
                leftIcon={<FcDownload />}
                colorScheme="teal"
                variant="solid"
              >
                Export to CSV
              </Button>
            </CSVLink>
          </Stack>
        </Box>

        <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr
                {...headerGroup.getHeaderGroupProps()}
                key={String(headerGroup)}
              >
                {headerGroup.headers.map((column, index) =>
                  visibleColumns.includes(column.id) ? (
                    <Th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className={
                        column.isSorted
                          ? column.isSortedDesc
                            ? "desc"
                            : "asc"
                          : ""
                      }
                      key={index}
                      pe="10px"
                      borderColor={borderColor}
                    >
                      <Flex
                        justify="space-between"
                        align="center"
                        fontSize={{ sm: "10px", lg: "12px" }}
                        color="gray.400"
                      >
                        {column.render("Header")}
                        <div />
                        {/* {column.canFilter ? column.render("Filter") : null} */}
                        {column.Filter && <div>{column.render("Filter")}</div>}
                        <span>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <FaSortDown />
                            ) : (
                              <FaSortUp />
                            )
                          ) : (
                            ""
                          )}
                        </span>
                      </Flex>
                    </Th>
                  ) : (
                    <></>
                  )
                )}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <Td
                      {...cell.getCellProps()}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                      display={
                        visibleColumns.includes(cell.column.id)
                          ? "table-cell"
                          : "none"
                      }
                    >
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.render("Cell")}
                      </Text>
                    </Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        <Center>
          <Box mt={4} display="flex" justifyContent="flex-end">
            <Button
              mx={1}
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </Button>
            <Button
              mx={1}
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {"<"}
            </Button>
            <Button mx={1} onClick={() => nextPage()} disabled={!canNextPage}>
              {">"}
            </Button>
            <Button
              mx={1}
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </Button>
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
            <Select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
              size="lg"
              width={150}
            >
              {[10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </Select>
          </Box>
        </Center>
      </Card>
    </>
  );
};

export default TestTable;
