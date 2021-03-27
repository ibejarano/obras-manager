import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import {
  Center,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  FormErrorMessage,
} from "@chakra-ui/react";
import { gql } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation login($user: String!, $pass: String!) {
    login(input: { identifier: $user, password: $pass }) {
      jwt
    }
  }
`;

export default function LoginPage({ setToken }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [identifier, setIdentifier] = useState("ibejarano@test.com");
  const [password, setPassword] = useState("terere");
  const [login] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { data } = await login({
      variables: {
        user: identifier,
        pass: password,
      },
    });
    setToken(data.login.jwt);
    window.localStorage.setItem("obras-token", data.login.jwt);
    setIsSubmitting(false);
  };

  return (
    <Center h="100vh" bg="teal.600">
      <Box
        bg="white"
        as="form"
        borderWidth="4px"
        borderRadius="10px"
        p="24px"
        onSubmit={handleSubmit}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email de identificacion</FormLabel>
          <Input
            type="email"
            id="email"
            placeholder="Ingrese su email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <FormErrorMessage>Error!</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormErrorMessage>Error!</FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Ingresar
        </Button>
      </Box>
    </Center>
  );
}
