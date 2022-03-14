import React from 'react';
import { Paper, InputBase, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useAPI } from 'providers/BeersContextProvider';
import _debounce from 'lodash/debounce';

const Search = () => {
  const { fetchData } = useAPI();

  const debounceFn = _debounce(fetchData, 300)

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => debounceFn(e.target.value)

  return (
    <Paper
      component='form'
      sx={{ p: '2px 4px', m: '40px auto', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder='Search by name'
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleFilter}
      />
      <IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default Search;
