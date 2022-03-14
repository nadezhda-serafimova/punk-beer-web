import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BeersContextProvider } from 'providers/BeersContextProvider';
import Header from 'components/Header'
import Home from 'routes/Home'
import Favourites from 'routes/Favourites'
import NotFound from 'routes/NotFound'

function App() {
  return (
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
  );
}

export default App;
