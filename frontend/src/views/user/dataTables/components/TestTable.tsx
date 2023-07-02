import React, { useState } from "react";
import { useTable, useFilters, useSortBy } from "react-table";
import { CSVLink } from "react-csv";

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

  return (
    <div>
      <div>
        <div>
          <label>Toggle Columns: </label>
          {columns.map((column) => (
            <label key={column.accessor}>
              <input
                type="checkbox"
                checked={visibleColumns.includes(column.accessor)}
                onChange={() => toggleColumnVisibility(column.accessor)}
              />{" "}
              {column.Header}
            </label>
          ))}
        </div>
        <div>
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
        </div>
      </div>

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={String(headerGroup)}
            >
              {headerGroup.headers.map((column, index) =>
                visibleColumns.includes(column.id) ? (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={
                      column.isSorted
                        ? column.isSortedDesc
                          ? "desc"
                          : "asc"
                        : ""
                    }
                    key={index}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <i className="fas fa-sort-down"></i>
                        ) : (
                          <i className="fas fa-sort-up"></i>
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ) : (
                  <></>
                )
              )}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <CSVLink data={csvData} headers={csvHeaders}>
        Export to CSV
      </CSVLink>
    </div>
  );
};

export default TestTable;
