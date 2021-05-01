import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

export const Header = ({ login }: any) => {
  return login ? (
    <Box textAlign='center' mb={10}>
      <Heading>Login to your account</Heading>
    </Box>
  ) : (
    <Box textAlign='center' mb={10}>
      <Heading>Register a new account</Heading>
    </Box>
  );
};
