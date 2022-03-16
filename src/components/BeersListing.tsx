import React from 'react';
import { Grid } from '@mui/material';
import BeerCard from './BeerCard';
import { BeerProps, BeerCardType } from 'types';

const BeersListing = ({ beers, type }: { beers: BeerProps[], type: BeerCardType }) => {
  return (
    <Grid container spacing={4} justifyContent='flex-start' alignItems='stretch' sx={{ mb: '60px' }}>
      {beers.map((beer: BeerProps) => (
        <Grid item key={beer.id} md={6} lg={4}>
          <BeerCard beer={beer} type={type} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BeersListing;
