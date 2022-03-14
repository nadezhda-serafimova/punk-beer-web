import React from 'react';
import {
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  Box,
  Typography,
  ButtonBase,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Star as StarIcon } from '@mui/icons-material';
import { useAPI } from 'providers/BeersContextProvider';
import { BeerProps } from 'types';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const BeerCard = ({beer, isHome}: { beer: BeerProps, isHome?: boolean}) => {
  const { id, name, description, image_url } = beer;
  const { addFav } = useAPI();

  return (
    <Grid item key={id} sm={6} md={4}>
      <Card sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Box>
          <ButtonBase sx={{ width: 150, height: 150 }}>
            <Img alt={name} src={image_url} />
          </ButtonBase>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography gutterBottom variant='h5' component='h2'>
              {name}
            </Typography>
            <Typography>
              {description.length > 200 ? description.substring(0, 200) + '...' : description}
            </Typography>
          </CardContent>
          {
            isHome && (
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <CardActions>
                  <Button variant='outlined' startIcon={<StarIcon />} onClick={() => addFav(beer)}>
                    Add to favourites
                  </Button>
                </CardActions>
              </Box>
            )
          }
        </Box>
      </Card>
    </Grid>
  );
};

export default BeerCard;
