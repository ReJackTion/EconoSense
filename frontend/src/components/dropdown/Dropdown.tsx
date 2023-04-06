import React, { ChangeEvent } from "react";
import { Select } from "@chakra-ui/react";

interface Props {
  text: string; // Questions
  field: string; // for key and id
  options: string[];
  value: string;
  onChange(event: ChangeEvent<HTMLSelectElement>): void;
  required?: boolean;
}

export default function Dropdown(props: Props) {
  const { text, field, options, value, onChange, required } = props;

  return (
    <>
      {options?.length ? (
        <Select
          fontSize="sm"
          variant="subtle"
          defaultValue="United States"
          width="150px"
          fontWeight="700"
          id={field}
          name={field}
          onChange={(event) => onChange(event)}
          required={required}
        >
          {options.length ? (
            options.map((item, index) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))
          ) : (
            <></>
          )}
        </Select>
      ) : (
        <></>
      )}
    </>
  );
}
