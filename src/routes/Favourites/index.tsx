import React from 'react';
import {
  Container,
  Typography,
  Box,
} from '@mui/material';
import BeersListing from 'components/BeersListing'
import { useAPI } from 'providers/BeersContextProvider';

const Favourites = () => {
  const { favourites } = useAPI();

  return (
    <Container maxWidth='xl'>
      <Box
        sx={{ m: '40px auto', display: 'flex', flexDirection: 'column', alignItems: 'center', width: 400 }}
      >
        <Typography gutterBottom variant='h4' component='h4'>
          My favourites
        </Typography>
      </Box>
      {
        favourites.length > 0
          ? <BeersListing beers={favourites} />
          : <Box
            sx={{
              m: '40px auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography>
              Your favourites list is still empty
            </Typography>
          </Box>
      }
    </Container>
  );
};

export default Favourites;
