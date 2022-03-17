import React, { useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
} from '@mui/material';
import BeersListing from 'components/BeersListing'
import { useAPI } from 'providers/BeersContextProvider';
import { BeerCardType } from 'types';

const Favourites = () => {
  const { favourites, checkFavourites } = useAPI();

  useEffect(() => {
    checkFavourites();
  }, []);

  return (
    <Container maxWidth='xl'>
      <Box  sx={{ m: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography gutterBottom variant='h4' component='h4'>
          My favourites
        </Typography>
      </Box>
      {
        favourites.length > 0
          ? <BeersListing beers={favourites} type={BeerCardType.Fav} />
          : <Box sx={{ m: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography>
              Your favourites list is still empty
            </Typography>
          </Box>
      }
    </Container>
  );
};

export default Favourites;
