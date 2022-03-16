import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ethers } from 'ethers';
import { Box, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BeersContextProvider } from 'providers/BeersContextProvider';
import TopBar from 'components/TopBar';
import Header from 'components/Header';
import Home from 'routes/Home';
import Favourites from 'routes/Favourites';
import NotFound from 'routes/NotFound';

const theme = createTheme({
  palette: {
    primary: {
      main: '#05bfa3',
    },
  },
});

function App() {
  const [walletAddress, setWalletAddress] = useState<string>('');

  // Requests access to the user's META MASK WALLET
  async function requestAccount() {

    // Check if Meta Mask extension exist
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        console.log(accounts);
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.log('Error connecting...');
      }

    } else {
      console.log('Meta Mask not detected');
    }
  }

  // Create a provider
  async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // TODO - interact with a smart contract
    }
  }

  async function disconnectWallet() {
    setWalletAddress('');
  }

  return (
    <ThemeProvider theme={theme}>
      {
        walletAddress
          ? (
            <Router>
              <BeersContextProvider>
                <TopBar walletAddress={walletAddress} disconnectWallet={disconnectWallet} />
                <Header />
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/favourites' element={<Favourites />} />
                  <Route path='*' element={<NotFound />} />
                </Routes>
              </BeersContextProvider>
            </Router>
          )
          : (
            <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                variant='contained'
                color='secondary'
                onClick={requestAccount}
              >
                Connect Wallet
              </Button>
            </Box>
          )
      }

    </ThemeProvider>
  );
}

export default App;
