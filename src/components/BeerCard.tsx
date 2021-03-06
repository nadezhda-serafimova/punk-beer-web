import React from 'react';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Box,
  Typography,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Star as StarIcon } from '@mui/icons-material';
import { useAPI } from 'providers/BeersContextProvider';
import { BeerProps, BeerCardType } from 'types';
import _debounce from 'lodash/debounce';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const beerSound = new Audio('/assets/beer-opening.mp3');

const BeerCard = ({ beer, type }: { beer: BeerProps, type: BeerCardType }) => {

  const { id, name, description, image_url, isOutdated } = beer;
  const { addFav, favourites } = useAPI();

  const debouncePlayingBeerSound = _debounce(() => beerSound.play(), 300);

  const isInFavourites = (id: number) => !!favourites.find((fav: any) => fav.id === id);

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <Box>
        <Button sx={{ width: 150, height: 150 }} onClick={debouncePlayingBeerSound}>
          <Img alt={name} src={image_url} />
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography gutterBottom variant='h5' component='h2'>
            {name}
          </Typography>
          <Typography>
            {description.length > 200 ? description.substring(0, 200) + '...' : description}
          </Typography>
          {type === BeerCardType.Fav && (
            <Box sx={{ mt: '12px' }}>
              {isOutdated
                ? <Chip label='Outdated' color='warning' variant="outlined" />
                : <Chip label='Up to date' color='info' variant="outlined" />}
            </Box>
          )}
        </CardContent>
        {
          type === BeerCardType.Home && (
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
              <CardActions>
                <Button
                  variant='outlined'
                  startIcon={<StarIcon />}
                  onClick={() => addFav(beer)}
                  disabled={isInFavourites(id)}
                >
                  {isInFavourites(id) ? 'Favourite' : 'Add  to favourites'}
                </Button>
              </CardActions>
            </Box>
          )
        }
      </Box>
    </Card>
  );
};

export default BeerCard;
