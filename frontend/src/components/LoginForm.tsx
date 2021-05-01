import React from 'react';
import {
  Box,
  Link,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Checkbox,
  Button,
} from '@chakra-ui/react';

// import components
import { Header } from './Header';

export const LoginForm = () => {
  const VARIANT_COLOR = 'teal';

  return (
    <Box my={8} textAlign='left'>
      <form>
        <Header login='login' />

        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type='email' placeholder='Enter your email address' />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input type='password' placeholder='Enter your password' />
        </FormControl>

        <Stack isInline justifyContent='space-between' mt={4}>
          <Box>
            <Checkbox>Remember Me</Checkbox>
          </Box>
          <Box>
            <Link color={`${VARIANT_COLOR}.500`}>Forgot your password?</Link>
          </Box>
        </Stack>

        <Button variant={VARIANT_COLOR} width='full' mt={4}>
          Log In
        </Button>
      </form>
    </Box>
  );
};
