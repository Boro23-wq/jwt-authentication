import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export const Area = () => {
  return (
    <Flex minHeight='100vh' width='full' align='center' justifyContent='center'>
      <Box
        borderWidth={1}
        px={4}
        width='full'
        maxWidth='500px'
        borderRadius={4}
        textAlign='center'
        boxShadow='lg'
      >
        <Box p={4}>
          <LoginForm />
          <RegisterForm />
        </Box>
      </Box>
    </Flex>
  );
};
