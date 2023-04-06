// Chakra imports
import {
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Text,
  Heading,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import Gauge from "components/gaugeChart/Gauge";

export default function Default(props: {
  startContent?: JSX.Element;
  endContent?: JSX.Element;
  name: string;
  growth: number;
  value: number;
  id: string;
  risk: number;
}) {
  const { startContent, endContent, name, growth, value, id, risk } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";

  return (
    <Card py="15px">
      <Flex
        my="auto"
        h="100%"
        align={{ base: "center", xl: "center" }}
        justify={{ base: "center", xl: "center" }}
      >
        {startContent}

        <Stat my="auto" ms={startContent ? "18px" : "0px"}>
          <StatLabel
            lineHeight="100%"
            color={textColorSecondary}
            fontSize={{
              base: "sm",
            }}
          >
            {name}
          </StatLabel>
          {value != 0 ? (
            <StatNumber
              color={textColor}
              fontSize={{
                base: "2xl",
              }}
            >
              {value}
            </StatNumber>
          ) : (
            <Flex my={2}>
              <Heading size="md">Data not available</Heading>
            </Flex>
          )}
          {value != 0 ? (
            <Flex align="center">
              {growth > 0 ? (
                <Text color="green.500" fontSize="xs" fontWeight="700" me="5px">
                  +{growth.toFixed(2)}%
                </Text>
              ) : (
                <Text color="red.500" fontSize="xs" fontWeight="700" me="5px">
                  {growth.toFixed(2)}%
                </Text>
              )}
              <Text color="secondaryGray.600" fontSize="xs" fontWeight="400">
                since last month
              </Text>
            </Flex>
          ) : null}
          {value != 0 ? <Gauge id={id} risk={risk} /> : <></>}
        </Stat>
        <Flex ms="auto" w="max-content">
          {endContent}
        </Flex>
      </Flex>
    </Card>
  );
}
