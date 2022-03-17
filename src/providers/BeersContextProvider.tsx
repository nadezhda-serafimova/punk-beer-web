import React, { useContext, useState, useEffect, createContext } from 'react';
import axios from 'axios';
import hash from 'object-hash';
import { BeerProps } from 'types';

interface IApiContext {
  beers: BeerProps[];
  favourites: BeerProps[];
  isLoading: boolean;
  fetchData: (query?: string) => void;
  addFav: (beer: BeerProps) => void;
  checkFavourites: () => void;
  getRandom: () => Promise<BeerProps> | null;
}

const defaultState = {
  beers: [],
  favourites: [],
  isLoading: false,
  fetchData: () => {
  },
  addFav: (beer: BeerProps) => {
  },
  checkFavourites: () => {
  },
  getRandom: () => null
};

const APIContext = createContext<IApiContext>(defaultState);

export const BeersContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [beers, setBeers] = useState([]);
  const [favourites, setFavourites] = useState<any[]>(localStorage.favourites
    ? JSON.parse(localStorage.getItem('favourites') || '')
    : []
  );
  const [isLoading, setIsLoading] = useState(true);

  // Fetch beers
  async function fetchData(query?: string) {

    const { data } = await axios.get(
      `https://api.punkapi.com/v2/beers${query ? `?beer_name=${query}` : ''}`,
    );

    setBeers(data);
    setIsLoading(false);
  }

  // Get random beer
  async function getRandom(): Promise<BeerProps> {
    const response = await axios.get(
      'https://api.punkapi.com/v2/beers/random',
    );

    const { id, name, description, image_url: imageUrl } =  response.data[0]

    return {
      id, name, description, image_url: imageUrl
    }
  }

  // Add beer to favourites
  const addFav = (beer: any) => {
    const favBeers = [...favourites, { ...beer, isOutdated: false}];
    setFavourites(favBeers);
    localStorage.setItem('favourites', JSON.stringify(favBeers));
  };

  // Check favourite beers for update
  async function checkFavourites() {
    const ids: string = favourites.map(fav => fav.id).join('|');

    const { data } = await axios.get(
      `https://api.punkapi.com/v2/beers?ids=${ids}`,
    );

    setFavourites(favourites.map(fav => {
      delete fav['isOutdated'];
      const updatedBeer = data.find((d: any) => d.id === fav.id);
      return {
        ...fav,
        isOutdated: hash(fav) !== hash(updatedBeer)
      }
    }))
  }

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
        getRandom,
        addFav,
        checkFavourites,
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
