import React from 'react';
import {
  Container,
  Box,
  CircularProgress,
  Typography
} from '@mui/material';
import Search from 'components/Search';
import BeersListing from 'components/BeersListing';
import { useAPI } from 'providers/BeersContextProvider';

const Home = () => {
  const { isLoading, beers } = useAPI();

  if (isLoading) return <CircularProgress />;

  return (
    <Container maxWidth='xl'>
      <Search />
      {
        beers.length > 0
          ? <BeersListing beers={beers} isHome />
          : <Box
            sx={{
              p: '2px 4px',
              m: '40px auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: 400,
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
