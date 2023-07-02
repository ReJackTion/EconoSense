import React, { useEffect, ChangeEvent } from "react";
import useSWR from "swr";
import CountryList from "services/country_list.service";

import Dropdown from "components/dropdown/Dropdown";

interface Props {
  country: string;
  onChange(event: ChangeEvent<HTMLSelectElement>): void;
}

export default function SelectCountry(props: Props) {
  const { country, onChange } = props;
  const { data, error, isLoading } = useSWR("/", CountryList.getCountryList);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (error) return <div>Failed to load, data is not available yet.</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <Dropdown
      text="Select country"
      field="country"
      options={data.country_list}
      value={country}
      onChange={onChange}
      required
      title="Country"
    />
  );
}
