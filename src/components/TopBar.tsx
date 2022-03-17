import * as React from 'react';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const Img = styled('img')({
  display: 'block',
  width: '22px',
  height: '22px',
  marginRight: '6px',
});

export type TopBarProps = {
  walletAddress: string;
  disconnectWallet: () => {};
}

const TopBar = ({ walletAddress, disconnectWallet }: TopBarProps) => {
  return (
    <Box sx={{
      p: '4px 0',
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      justifyContent: 'center',
      alignItems: 'center',
      background: '#97e6da',
    }}>
      <Img alt='MetaMask' src='/assets/MetaMask_Logo.svg' />
      <Typography sx={{ fontSize: '14px' }}>
        Connected with MetaMask Wallet:&nbsp;
      </Typography>
      <Typography sx={{ fontWeight: 'bold', fontSize: '14px' }}>
        {walletAddress}
      </Typography>
      <Button
        size='small'
        variant='outlined'
        color='secondary'
        onClick={disconnectWallet}
        sx={{ ml: '6px' }}
      >
        Disconnect
      </Button>
    </Box>
  );
};

export default TopBar;
