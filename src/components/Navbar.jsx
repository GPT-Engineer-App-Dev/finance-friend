import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Heading, Spacer, Link, Button } from "@chakra-ui/react";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="teal.500" color="white">
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          Budget App
        </Heading>
      </Flex>
      <Spacer />
      <Box>
        {isAuthenticated ? (
          <Button onClick={() => setIsAuthenticated(false)}>Logout</Button>
        ) : (
          <>
            <Link as={RouterLink} to="/login" mr={4}>
              Login
            </Link>
            <Link as={RouterLink} to="/register">
              Register
            </Link>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
