import { Heading, Center } from "@chakra-ui/react";

export default function IndicatorsHeading(props: { title: string }) {
  return (
    <Center h="70px" my={5}>
      <Heading size="lg">{props.title}</Heading>
    </Center>
  );
}
