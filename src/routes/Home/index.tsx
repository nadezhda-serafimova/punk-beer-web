import React from 'react';
import {
  Container,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';
import Search from 'components/Search';
import BeersListing from 'components/BeersListing';
import { useAPI } from 'providers/BeersContextProvider';
import { BeerCardType } from 'types';

const Home = () => {
  const { isLoading, beers } = useAPI();

  if (isLoading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', m: '50px 0' }}>
      <CircularProgress />
    </Box>
  );

  return (
    <Container maxWidth='xl'>
      <Search />
      {
        beers.length > 0
          ? <BeersListing beers={beers} type={BeerCardType.Home} />
          : <Box
            sx={{
              p: '2px 4px',
              m: '40px 0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography gutterBottom variant='h5' component='h2'>
              No matching records
            </Typography>
            <Typography>
              Please try again
            </Typography>
          </Box>
      }
    </Container>
  );
};

export default Home;
