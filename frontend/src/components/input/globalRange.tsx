import React from "react";
import { Input, HStack } from "@chakra-ui/react";

const NumberRangeGlobalFilter: React.FC<{
  filterValue: any;
  setFilter: (value: any) => void;
}> = ({ filterValue = [], setFilter }) => {
  const handleChange = (index: number, value: string) => {
    const newFilterValues = [...filterValue];
    newFilterValues[index] = value;
    setFilter(newFilterValues);
  };

  return (
    <HStack spacing={2}>
      {Array.from({ length: 14 }, (_, i) => (
        <React.Fragment key={i}>
          <Input
            size="sm"
            value={filterValue[i * 2] || ""}
            onChange={(e) => handleChange(i * 2, e.target.value)}
            placeholder={`Column ${i + 1} Min`}
          />
          <Input
            size="sm"
            value={filterValue[i * 2 + 1] || ""}
            onChange={(e) => handleChange(i * 2 + 1, e.target.value)}
            placeholder={`Column ${i + 1} Max`}
          />
        </React.Fragment>
      ))}
    </HStack>
  );
};

export default NumberRangeGlobalFilter;
