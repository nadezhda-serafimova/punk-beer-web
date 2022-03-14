import React from 'react';
import {
  Grid,
} from '@mui/material';
import BeerCard from './BeerCard';
import { BeerProps } from 'types';

const BeersListing = ({ beers, isHome }: { beers: BeerProps[], isHome?: boolean }) => {
  return (
    <Grid container spacing={4} justifyContent='flex-start' alignItems='stretch'>
      {beers.map((beer: BeerProps) => (
        <BeerCard key={beer.id} beer={beer} isHome={isHome} />
      ))}
    </Grid>
  );
};

export default BeersListing;
