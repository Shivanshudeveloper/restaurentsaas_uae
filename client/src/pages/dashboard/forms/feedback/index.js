import { useEffect, useState } from "react";
import Head from "next/head";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import { ContactForm } from "../../../../components/contact/contact-form";
import { ArrowLeft as ArrowLeftIcon } from "../../../../icons/arrow-left";
import { Mail as MailIcon } from "../../../../icons/mail";
import { gtm } from "../../../../lib/gtm";
import NextLink from "next/link";
import queryString from "query-string";


const Contact = () => {

  const [name, setname] = useState('');


  useEffect(() => {
    gtm.push({ event: "page_view" });

    var { n } = queryString.parse(window.location.search);
    if (n) {
      setname(n);
    }
  }, []);


  return (
    <>
      <Head>
        <title>Feedback Form</title>
      </Head>
        <Box
            sx={{
                py: 8
            }}
        >
          <Container
              maxWidth="md"
              sx={{
              pl: {
                  lg: 15
              }
              }}
          >
            <center>
            <Typography sx={{ pb: 3 }} variant="h6">
              Test Restaurent
            </Typography>
            
            </center>
            
            <ContactForm name={name} />
          </Container>
        </Box>
    </>
  );
};

export default Contact;
