import { Box, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
// Assets
// Custom components
import Indicators from "../../components/indicators/Indicators";
import SelectCountry from "components/dropdown/SelectCountry";
import SelectPeriod from "components/dropdown/SelectPeriod";
import UserLayout from "layouts/user";
import React, { useState, useEffect, ChangeEvent } from "react";

export default function UserReports() {
  // Chakra Color Mode

  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const [country, setCountry] = useState("United States");
  const monthIndex = String(new Date().getMonth() - 1).padStart(2, "0");
  const yearIndex = new Date().getFullYear();
  const latestPeriod = `${yearIndex}-${monthIndex}-01`;
  const [period, setPeriod] = useState(latestPeriod);

  const countryOnChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = event.target;
    setCountry(value);
  };

  const periodOnChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = event.target;
    setPeriod(value);
  };

  return (
    <UserLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <>
          <SelectCountry
            country={country}
            onChange={(event) => countryOnChangeHandler(event)}
          />
          <SelectPeriod
            period={period}
            onChange={(event) => periodOnChangeHandler(event)}
          />
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
            gap="20px"
            mb="20px"
          >
            <Indicators selected_country={country} selected_period={period} />
          </SimpleGrid>
        </>
      </Box>
    </UserLayout>
  );
}
