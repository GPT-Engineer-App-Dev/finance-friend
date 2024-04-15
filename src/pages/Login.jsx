import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Heading, Input, Button } from "@chakra-ui/react";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/");
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={8}>
        Login
      </Heading>
      <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} mb={4} />
      <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} mb={4} />
      <Button colorScheme="blue" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
