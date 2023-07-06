import React, { useState } from "react";
import { useTable, useFilters, useSortBy } from "react-table";
import { CSVLink } from "react-csv";
import Card from "components/card/Card";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { FcDownload } from "react-icons/fc";
import ValueRangeColumnFilter from "components/input/slider";

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
  Checkbox,
  Input,
  useColorModeValue,
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
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map((column) => column.accessor)
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
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
  } = useTable(
    {
      columns,
      data: filteredData.length ? filteredData : data,
      defaultColumn: { sortType: "basic" },
    },
    useFilters,
    useSortBy
  );

  const handleFilterChange = (columnId: string, value: string) => {
    setFilter(columnId, value);
    const filters = allColumns.map((column) => ({
      id: column.id,
      value: column.filterValue,
    }));
    let filteredData = data;
    filters.forEach((filter) => {
      if (filter.value) {
        filteredData = filteredData.filter((row) => {
          const cellValue = row[filter.id];
          return cellValue !== undefined
            ? String(cellValue)
                .toLowerCase()
                .includes(filter.value.toLowerCase())
            : true;
        });
      }
    });
    setFilteredData(filteredData);
  };

  const handleFilterRangeChange = (columnId: string, value: number) => {
    setFilter(columnId, value);
    const filters = allColumns.map((column) => ({
      id: column.id,
      value: column.filterValue,
    }));
    let filteredData = data;
    filters.forEach((filter) => {
      if (filter.value) {
        filteredData = filteredData.filter((row) => {
          const cellValue = row[filter.id];
          return cellValue !== undefined
            ? String(cellValue)
                .toLowerCase()
                .includes(filter.value.toLowerCase())
            : true;
        });
      }
    });
    setFilteredData(filteredData);
  };

  const toggleColumnVisibility = (columnId: string) => {
    if (visibleColumns.includes(columnId)) {
      setVisibleColumns(visibleColumns.filter((col) => col !== columnId));
    } else {
      setVisibleColumns([...visibleColumns, columnId]);
    }
  };

  const getVisibleColumns = () =>
    columns.filter((column) => visibleColumns.includes(column.accessor));

  const sortTypes = {
    date: (rowA: any, rowB: any, columnId: string) => {
      const valueA = new Date(rowA.values[columnId]);
      const valueB = new Date(rowB.values[columnId]);
      return valueA.getTime() - valueB.getTime();
    },
  };

  const csvHeaders = getVisibleColumns().map((column) => column.Header);
  const csvData = rows.map((row) =>
    getVisibleColumns().map((column) => row.values[column.accessor])
  );

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const [range, setRange] = useState<any[]>([]);

  return (
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
                <Input
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
                />
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
          {rows.map((row) => {
            prepareRow(row);
            console.log("row:", row);
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
    </Card>
  );
};

export default TestTable;
