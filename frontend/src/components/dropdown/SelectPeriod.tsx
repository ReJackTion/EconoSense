import React, { ChangeEvent } from "react";
import Dropdown from "components/dropdown/Dropdown";
import { getDateRange } from "utils/getDateRange";

interface Props {
  period: string;
  onChange(event: ChangeEvent<HTMLSelectElement>): void;
  title: string;
}

export default function SelectPeriod(props: Props) {
  const { period, onChange, title } = props;
  console.log(period);

  return (
    <Dropdown
      text="Select period"
      field="period"
      options={getDateRange()}
      value={period}
      onChange={onChange}
      required
      title={title}
    />
  );
}
