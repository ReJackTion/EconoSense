// Chakra imports
import {
  Flex,
  Text,
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  Switch,
} from "@chakra-ui/react";
import Card from "components/card/Card";
// Custom components
import SwitchField from "components/fields/SwitchField";
import Menu from "components/menu/MainMenu";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

import { useSession, signIn } from "next-auth/react";

import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth from "services/auth.service";
import { useRouter } from "next/router";

export default function Notifications(props: { [x: string]: any }) {
  const { ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");

  const { data: session } = useSession();

  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");

  const router = useRouter();

  const [show, setShow] = React.useState(false);
  const [isAlert, setIsAlert] = React.useState(true);

  const handleClick = () => setShow(!show);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const _target = e.target as any;
    const email = _target.email.value;
    const password = _target.password.value;
    const firstName = _target.firstName.value;
    const surname = _target.surname.value;
    const emailAlerts = isAlert;
    const result = await auth.update(
      email,
      password,
      session.token,
      firstName,
      surname,
      emailAlerts
    );
    const result2 = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    // console.log("result:", session.token);
    if (result?.error) {
      toast.error("Invalid email or password!!");
    } else {
      toast("Update sucessfully!!", { autoClose: 3000 });
      //   router.reload(window.location.pathname);
    }
  };

  return (
    session && (
      <Card mb="20px" {...rest}>
        <Flex align="center" w="100%" justify="space-between" mb="30px">
          <Text
            color={textColorPrimary}
            fontWeight="bold"
            fontSize="2xl"
            mb="4px"
          >
            Personal Information
          </Text>
          {/* <Menu /> */}
        </Flex>
        {/* <SwitchField
				isChecked={true}
				reversed={true}
				fontSize='sm'
				mb='20px'
				id='1'
				label='Item update notifications'
			/> */}
        {/* <SwitchField reversed={true} fontSize='sm' mb='20px' id='2' label='Item comment notifications' />
			<SwitchField reversed={true} fontSize='sm' mb='20px' id='3' label='Buyer review notifications' />
			<SwitchField reversed={true} fontSize='sm' mb='20px' id='4' label='Rating reminders notifications' />
			<SwitchField reversed={true} fontSize='sm' mb='20px' id='5' label='Meetups near you notifications' />
			<SwitchField reversed={true} fontSize='sm' mb='20px' id='6' label='Company news notifications' />
			<SwitchField reversed={true} fontSize='sm' mb='20px' id='7' label='New launches and projects' /> */}
        {/* <SwitchField
          reversed={true}
          fontSize="sm"
          mb="20px"
          id="8"
          label="Email notification alert"
          isChecked={true}
        /> */}
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              First Name<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={false}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              placeholder="John"
              mb="24px"
              fontWeight="500"
              size="lg"
              name="firstName"
              id="firstName"
              defaultValue={session.user.name.split(" ")[0]}
            />
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Surname<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={false}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              placeholder="Smith"
              mb="24px"
              fontWeight="500"
              size="lg"
              name="surname"
              id="surname"
              defaultValue={session.user.name.split(" ")[1]}
            />
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="email"
              placeholder="mail@EconoSense.com"
              mb="24px"
              fontWeight="500"
              size="lg"
              name="email"
              id="email"
              value={session.user.email}
            />
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                fontSize="sm"
                placeholder="Min. 8 characters"
                mb="24px"
                size="lg"
                type={show ? "text" : "password"}
                variant="auth"
                name="password"
                id="password"
                defaultValue={session.user.password}
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>

            <FormLabel htmlFor="email-alerts" mb="0">
              Enable email alerts?
            </FormLabel>
            <Switch
              id="emailAlerts"
              name="emailAlerts"
              defaultChecked={true}
              onChange={(e) => {
                setIsAlert(e.target.checked);
                // console.log(e.target.checked);
              }}
            />

            <Flex
              justifyContent="space-between"
              align="center"
              mb="24px"
            ></Flex>

            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              type="submit"
            >
              Update profile
            </Button>
          </FormControl>
        </form>
        {/* <SwitchField reversed={true} fontSize='sm' mb='20px' id='9' label='Subscribe to newsletter' /> */}
        {/* <SwitchField reversed={true} fontSize='sm' mb='20px' id='10' label='Email me when someone follows me' /> */}
        <ToastContainer />
      </Card>
    )
  );
}
