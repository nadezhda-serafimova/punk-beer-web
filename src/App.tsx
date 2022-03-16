import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BeersContextProvider } from 'providers/BeersContextProvider';
import Header from 'components/Header'
import Home from 'routes/Home'
import Favourites from 'routes/Favourites'
import NotFound from 'routes/NotFound'

const theme = createTheme({
  palette: {
    primary: {
      main: "#05bfa3"
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <BeersContextProvider>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/favourites' element={<Favourites />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BeersContextProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
