import React, { useState } from 'react';
import {
  Box,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Close as CloseIcon, SportsBar as SportsBarIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useAPI } from 'providers/BeersContextProvider';
import BeerCard from './BeerCard';
import { BeerProps, BeerCardType } from 'types';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      width: '400px',
    },
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const GetRandom = () => {
  const { getRandom } = useAPI();
  const [open, setOpen] = useState(false);
  const [randomBeer, setRandomBeer] = useState<null | BeerProps>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRandomBeer = async () => {
    const beer = await getRandom();
    setIsLoading(false);
    setRandomBeer(beer);
    handleClickOpen();
  };

  return (
    <div>
      <Button
        variant='contained'
        color='secondary'
        startIcon={<SportsBarIcon />}
        onClick={handleRandomBeer}
        sx={{ my: 2, ml: 2 }}
      >
        Random beer
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='dialog-title'
        open={open}
      >
        <BootstrapDialogTitle id='dialog-title' onClose={handleClose}>
          Cheers!
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container spacing={4}>
            <Grid item sm={12}>
              {
                isLoading
                  ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                  </Box>
                  : <BeerCard beer={randomBeer!} type={BeerCardType.Random} />
              }
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Thanks
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default GetRandom;
