import React, { useContext, useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { BeerProps } from 'types';

interface IApiContext {
  beers: BeerProps[];
  favourites: BeerProps[];
  isLoading: boolean;
  fetchData: (query?: string) => void;
  addFav: (beer: BeerProps) => void;
  getRandomBeer: () => Promise<BeerProps> | null;
}

const defaultState = {
  beers: [],
  favourites: [],
  isLoading: false,
  fetchData: () => {
  },
  addFav: (beer: BeerProps) => {
  },
  getRandomBeer: () => null
};

const APIContext = createContext<IApiContext>(defaultState);

export const BeersContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [beers, setBeers] = useState([]);
  const [favourites, setFavourites] = useState<any[]>(localStorage.favourites ? JSON.parse(localStorage.getItem('favourites') || '') : []);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData(query?: string) {

    const { data } = await axios.get(
      `https://api.punkapi.com/v2/beers${query ? `?beer_name=${query}` : ''}`,
    );

    setBeers(data);
    setIsLoading(false);
  }

  async function getRandomBeer(): Promise<BeerProps> {
    const response = await axios.get(
      'https://api.punkapi.com/v2/beers/random',
    );

    const { id, name, description, image_url: imageUrl } =  response.data[0]

    return {
      id, name, description, image_url: imageUrl
    }
  }

  const addFav = (beer: any) => {
    const favBeers = [...favourites, beer];
    setFavourites(favBeers);
    localStorage.setItem('favourites', JSON.stringify(favBeers));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <APIContext.Provider
      value={{
        isLoading,
        beers,
        favourites,
        fetchData,
        getRandomBeer,
        addFav,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export const useAPI = () => {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error('Context must be used within a Provider');
  }

  return context;
};
