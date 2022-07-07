import React from "react";
import {
  Box,
  Button,
  Grid,
  Link,
  MenuItem,
  Rating,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { typography } from "@mui/system";

import RadioGroupRating from "../RadioGroupRating";
import { useAuth } from "../../hooks/use-auth";
import { API_SERVICE } from "../../config";
import axios from "axios";

export const ContactForm = ({ name }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const { user } = useAuth();

  const [rating, setrating] = React.useState(5);
  const [message, setMessage] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = async () => {
    setOpen(false);
    await addNewFeedback();
    window.location.href = "/dashboard/forms";
  };

  const submitReview = () => {
    console.log(rating);
    // if (Number(rating) >= 4) {
    //   var url =
    //     "https://www.google.com/search?q=sortwind&authuser=5&sxsrf=APq-WBsPsHyxn5mX312u4SpceRRHk6Jryg%3A1649227770997&source=hp&ei=-jdNYrTjOo2RoAT52ITYCA&iflsig=AHkkrS4AAAAAYk1GCgNejfiwEDVNnxhoh7r8xiR62smO&ved=0ahUKEwi0yMSb7P72AhWNCIgKHXksAYsQ4dUDCAc&uact=5&oq=sortwind&gs_lcp=Cgdnd3Mtd2l6EAMyBwgAEIAEEAoyBAgAEAoyBAgAEAoyBAgAEAoyBAgAEAoyBAgAEAoyBAgAEAoyBAgAEAoyBAgAEAoyBAgAEAo6BQgAEIAEOgsIABCABBCxAxCDAToLCC4QgAQQsQMQgwE6EQguEIAEELEDEIMBEMcBENEDOggIABCABBCxAzoICC4QgAQQsQM6CwguEIAEELEDENQCOgUIABCxA1AAWKEbYIYkaABwAHgAgAGnAogBjwySAQUwLjMuNZgBAKABAQ&sclient=gws-wiz#lrd=0x390cf1df3afea123:0xb35952ca94482152,3,,,";
    //   window.open(url, "_blank").focus();
    // }
    handleClickOpen();
  };

  const addNewFeedback = async () => {
    if (!user?.id) return;
    await axios
      .post(`${API_SERVICE}/add_feedback`, {
        rating,
        userId: user?.id,
        message,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <center>
            {/* <img style={{ width: '350px', marginBottom: '2px' }} src="/survey.png" /> */}
            <Typography sx={{ mb: 4 }} variant="h5">
              Thank you for your feedback!
            </Typography>
          </center>
          <Typography sx={{ mb: 1 }} variant="subtitle2">
            Message
          </Typography>
          <TextField
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            fullWidth
            name="message"
            required
            multiline
            rows={6}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <form onSubmit={handleSubmit}>
        <center>
          <img
            alt="Logo"
            style={{ width: "100px", marginBottom: "10px" }}
            src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
          />

          {rating === 5 ? (
            <Typography sx={{ mt: 5 }} variant="h6">
              We like you too!
            </Typography>
          ) : rating === 4 ? (
            <Typography sx={{ mt: 5 }} variant="h6">
              Good
            </Typography>
          ) : rating === 3 ? (
            <Typography sx={{ mt: 5 }} variant="h6">
              Average
            </Typography>
          ) : rating === 2 ? (
            <Typography sx={{ mt: 5 }} variant="h6">
              Bad
            </Typography>
          ) : rating === 1 ? (
            <Typography sx={{ mt: 5 }} variant="h6">
              Terrible!!!
            </Typography>
          ) : null}
          <Typography sx={{ mb: 1, color: "gray" }} variant="subtitle2">
            We really need your feedback to improve
          </Typography>
        </center>

        <center>
          <RadioGroupRating rating={rating} setrating={setrating} />
        </center>

        <Grid container spacing={3}>
          {/* <Grid item xs={12} sm={12}>
          <Typography sx={{ mb: 1 }} variant="subtitle2">
            Full Name *
          </Typography>
          <TextField value={name} fullWidth name="name" required />
        </Grid> */}
          {/* <Grid item xs={12} sm={6}>
          <Typography sx={{ mb: 1 }} variant="subtitle2">
            Last Name*
          </Typography>
          <TextField fullWidth name="company" required />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ mb: 1 }} variant="subtitle2">
            Email
          </Typography>
          <TextField fullWidth name="email" type="email" required />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ mb: 1 }} variant="subtitle2">
            Phone Number *
          </Typography>
          <TextField fullWidth name="phone" required type="tel" />
        </Grid> */}
          {/* <Grid item xs={12} sm={6}>
          <Typography sx={{ mb: 1 }} variant="subtitle2">
            Company Size
          </Typography>
          <Select fullWidth>
            <MenuItem value="10-20">1-10</MenuItem>
            <MenuItem value="11-30">11-30</MenuItem>
            <MenuItem value="31-50">31-50</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ mb: 1 }} variant="subtitle2">
            Team
          </Typography>
          <Select fullWidth>
            <MenuItem value="engineering">Engineering</MenuItem>
            <MenuItem value="design">Design</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ mb: 1 }} variant="subtitle2">
            Project Budget *
          </Typography>
          <Select fullWidth required>
            <MenuItem value={20000}>$20,000+</MenuItem>
            <MenuItem value={50000}>$50,000+</MenuItem>
          </Select>
        </Grid> */}
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 3,
          }}
        >
          <Button
            onClick={submitReview}
            sx={{ mt: 5, width: "450px" }}
            variant="contained"
          >
            {Number(rating) >= 4 ? <>Comment</> : <>Comment</>}
          </Button>
        </Box>
      </form>
    </>
  );
};
