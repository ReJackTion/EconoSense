import React, { useState } from "react";
import { useTable, useFilters, useSortBy } from "react-table";
import { CSVLink } from "react-csv";
import Card from "components/card/Card";
import { FaSortDown, FaSortUp } from "react-icons/fa";

import {
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Checkbox,
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

  console.log("visibleColumns", visibleColumns);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
    allColumns,
    getToggleHideAllColumnsProps,
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
      <div>
        <div>
          <label>Toggle Columns: </label>
          {columns.map((column) => (
            <label key={column.accessor}>
              {/* <input
                type="checkbox"
                checked={visibleColumns.includes(column.accessor)}
                onChange={() => toggleColumnVisibility(column.accessor)}
              />{" "} */}
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
                <input
                  type="text"
                  onChange={(e) =>
                    handleFilterChange(column.accessor, e.target.value)
                  }
                />
              </Flex>
            </label>
          ))}
        </div>
        {/* <div>
          {columns.map((column) => (
            <div key={column.accessor}>
              <label>{column.Header}: </label>
              <input
                type="text"
                onChange={(e) =>
                  handleFilterChange(column.accessor, e.target.value)
                }
              />
            </div>
          ))}
        </div> */}
      </div>

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
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td
                    {...cell.getCellProps()}
                    fontSize={{ sm: "14px" }}
                    minW={{ sm: "150px", md: "200px", lg: "auto" }}
                    borderColor="transparent"
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
      <CSVLink data={csvData} headers={csvHeaders}>
        Export to CSV
      </CSVLink>
    </Card>
  );
};

export default TestTable;
