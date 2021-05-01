import * as React from 'react';
import { ChakraProvider, Box, VStack, Grid, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Area } from './components/Area';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign='center' fontSize='xl'>
      <Grid minH='100vh'>
        <ColorModeSwitcher justifySelf='flex-end' />
        <VStack>
          <Area />
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
);
