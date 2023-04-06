import React, { ChangeEvent } from "react";
import Dropdown from "components/dropdown/Dropdown";
import { getDateRange } from "utils/getDateRange";

interface Props {
  period: string;
  onChange(event: ChangeEvent<HTMLSelectElement>): void;
}

export default function SelectPeriod(props: Props) {
  const { period, onChange } = props;

  return (
    <Dropdown
      text="Select period"
      field="period"
      options={getDateRange()}
      value={period}
      onChange={onChange}
      required
    />
  );
}
