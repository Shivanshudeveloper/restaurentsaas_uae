import React, { useEffect } from 'react';
import Head from 'next/head';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { AuthGuard } from '../../components/authentication/auth-guard';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { gtm } from '../../lib/gtm';

const FeedbackSetting = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const [value, setValue] = React.useState('female');
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Head>
        <title>
          Feedback Settings
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
            <Typography variant="h4">
                Feedback Settings
            </Typography>

            <Button
                sx={{ float: 'right' }}
                variant='contained'
            >
                Update the settings
            </Button>

            <FormControl sx={{ mt: 4 }} >
            <FormLabel sx={{ mb: 2 }} id="demo-row-radio-buttons-group-label">Select the social feedback</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                >
                    <FormControlLabel value="facebook" control={<Radio />} label="Facebook" />
                    <FormControlLabel value="google" control={<Radio />} label="Google" />
                </RadioGroup>
            </FormControl>

            {
                value === "facebook" || value === "google" ? (
                    <TextField 
                        sx={{ mt: 2 }}
                        fullWidth
                        label='Link'
                        value="https://www.google.com/search?q=sortwind&authuser=5&sxsrf=APq-WBsPsHyxn5mX312u4SpceRRHk6Jryg%3A1649227770997&source=hp&ei=-jdNYrTjOo2RoAT52ITYCA&iflsig=AHkkrS4AAAAAYk1GCgNejfiwEDVNnxhoh7r8xiR62smO&ved=0ahUKEwi0yMSb7P72AhWNCIgKHXksAYsQ4dUDCAc&uact=5&oq=sortwind&gs_lcp=Cgdnd3Mtd2l6EAMyBwgAEIAEEAoyBAgAEAoyBAgAEAoyBAgAEAoyBAgAEAoyBAgAEAoyBAgAEAoyBAgAEAoyBAgAEAoyBAgAEAo6BQgAEIAEOgsIABCABBCxAxCDAToLCC4QgAQQsQMQgwE6EQguEIAEELEDEIMBEMcBENEDOggIABCABBCxAzoICC4QgAQQsQM6CwguEIAEELEDENQCOgUIABCxA1AAWKEbYIYkaABwAHgAgAGnAogBjwySAQUwLjMuNZgBAKABAQ&sclient=gws-wiz#lrd=0x390cf1df3afea123:0xb35952ca94482152,3,,,"
                        variant='outlined'
                    />
                ) : null
            }
            
        </Container>
      </Box>
    </>
  );
};

FeedbackSetting.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default FeedbackSetting;
