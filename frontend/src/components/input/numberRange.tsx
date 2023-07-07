import React, { useState } from "react";
import { Input, HStack } from "@chakra-ui/react";

const NumberRangeColumnFilter: React.FC<{ column: any }> = ({ column }) => {
  //   const { filterValue = [], setFilter } = column;

  //   const handleChange = (index: number, value: string) => {
  //     const newFilterValues = [...filterValue];
  //     newFilterValues[index] = value;
  //     setFilter(
  //       newFilterValues.map((val) => (val === "" ? undefined : Number(val)))
  //     );
  //   };

  const [minValue, setMinValue] = useState(-999);
  const [maxValue, setMaxValue] = useState(999);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log("value:", value);
    if (name === "minValue") {
      setMinValue(Number(value));
    } else if (name === "maxValue") {
      setMaxValue(Number(value));
    }
  };

  const applyFilter = () => {
    const min = minValue ? Number(minValue) : undefined;
    const max = maxValue ? Number(maxValue) : undefined;
    column.setFilter([min, max]);
  };

  const clearFilter = () => {
    setMinValue(-999);
    setMaxValue(999);
    column.setFilter([undefined, undefined]);
  };

  return (
    <HStack spacing={2}>
      <Input
        size="sm"
        // value={filterValue[0] ?? ""}
        // onChange={(e) => handleChange(0, e.target.value)}
        value={minValue}
        onChange={handleChange}
        placeholder="Min"
        type="number"
        name="minValue"
        width={20}
      />
      <Input
        size="sm"
        // value={filterValue[1] ?? ""}
        // onChange={(e) => handleChange(1, e.target.value)}
        value={maxValue}
        onChange={handleChange}
        placeholder="Max"
        type="number"
        name="maxValue"
        width={20}
      />
      <button onClick={applyFilter}>Apply</button>
      <button onClick={clearFilter}>Clear</button>
    </HStack>
  );
};

export default NumberRangeColumnFilter;
