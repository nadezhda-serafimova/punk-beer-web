import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon } from '@mui/icons-material';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth='xl'>
      <Box
        sx={{ m: '40px auto', display: 'flex', flexDirection: 'column', alignItems: 'center', width: 400 }}
      >
        <Typography gutterBottom variant='h4' component='h4'>
          404 Page Not Found
        </Typography>
        <Button variant='contained' startIcon={<HomeIcon />} sx={{ mt: '20px' }} onClick={() => navigate('/')}>
          Go to home page
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
