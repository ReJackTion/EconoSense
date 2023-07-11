import React, { useState } from "react";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Box,
} from "@chakra-ui/react";

interface ValueRangeColumnFilterProps {
  column: {
    filterValue: any[];
    setFilter: (value: any) => void;
  };
}

const ValueRangeColumnFilter: React.FC<ValueRangeColumnFilterProps> = ({
  column: { filterValue = [], setFilter },
}) => {
  const [minValue, setMinValue] = useState(filterValue[0] || 0);
  const [maxValue, setMaxValue] = useState(filterValue[1] || 100);

  const handleFilterChange = () => {
    setFilter([minValue, maxValue]);
  };

  return (
    <Box width="200px">
      <RangeSlider
        min={0}
        max={100}
        step={1}
        defaultValue={[minValue, maxValue]}
        onChange={(values) => {
          setMinValue(values[0]);
          setMaxValue(values[1]);
        }}
        onChangeEnd={handleFilterChange}
      >
        <RangeSliderTrack bg="red.100">
          <RangeSliderFilledTrack bg="tomato" />
        </RangeSliderTrack>
        <RangeSliderThumb boxSize={6} index={0} />
        <RangeSliderThumb boxSize={6} index={1} />
      </RangeSlider>
    </Box>
  );
};

export default ValueRangeColumnFilter;
