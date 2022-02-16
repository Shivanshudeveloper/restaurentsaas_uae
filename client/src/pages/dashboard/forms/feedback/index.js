import { useEffect } from "react";
import Head from "next/head";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import { ContactForm } from "../../../../components/contact/contact-form";
import { ArrowLeft as ArrowLeftIcon } from "../../../../icons/arrow-left";
import { Mail as MailIcon } from "../../../../icons/mail";
import { gtm } from "../../../../lib/gtm";
import NextLink from "next/link";

const Contact = () => {
  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Feedback Form | Repair Logging</title>
      </Head>
      <Box
        component="main"
        sx={{
          display: "grid",
          gridTemplateColumns: {
            lg: "repeat(2, 1fr)",
            xs: "repeat(1, 1fr)",
          },
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            backgroundColor: "background.default",
            py: 8,
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              pl: {
                lg: 15,
              },
            }}
          >
            <NextLink href="/dashboard/forms" passHref>
              <Button
                component="a"
                startIcon={<ArrowLeftIcon fontSize="small" />}
              >
                Forms
              </Button>
            </NextLink>
            <Typography variant="h3" sx={{ mt: 3 }}>
              Give Feedback
            </Typography>

            <Typography variant="h1" sx={{ mt: 5 }}>
              Feel free to drop us your feedback!!!
            </Typography>
            <Typography sx={{ py: 3 }} variant="body1">
              We'd Love To Know What You Think. Do you have a suggestion or have
              some problem using our application? Let us know in the form.
            </Typography>
            {/* <Typography sx={{ color: "primary.main" }} variant="h6">
              Join 3,000+ forward-thinking companies:
            </Typography>
            <Box sx={{ pt: 2 }}>
              <img
                alt="logoipsum1"
                src="/static/contact/contact_logos.svg"
                style={{ maxWidth: "100%" }}
              />
            </Box> */}
          </Container>
        </Box>
        <Box
          sx={{
            backgroundColor: "background.paper",
            px: 6,
            py: 15,
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              pr: {
                lg: 15,
              },
            }}
          >
            <Typography sx={{ pb: 3 }} variant="h6">
              Fill the form below
            </Typography>
            <ContactForm />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Contact;
