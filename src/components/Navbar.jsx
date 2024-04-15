import React from "react";
import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="teal.500" color="white">
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          Budget App
        </Heading>
      </Flex>
      <Spacer />
      {}
    </Flex>
  );
};

export default Navbar;
