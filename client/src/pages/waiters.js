import React, { useCallback, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import {
    Box,
    Button,
    Grid,
    Container,
    Typography,
    Dialog, MenuItem,
    DialogContent, DialogActions, DialogTitle, Divider
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, AppBar, Toolbar, Badge } from "@mui/material";
import Restaurant from '@mui/icons-material/Restaurant';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DatePicker, TimePicker } from "@mui/lab";

const Waiters = () => {

    let [showWaiterModal, setShowWaiterModal] = useState(false)

    function closeShowWaiterModal() {
        setShowWaiterModal(false)
    }

    function openShowWaiterModal() {
        console.log("1")
        setShowWaiterModal(true)
    }

    return (
        <>
            {/* View details */}
            <Dialog
                open={showWaiterModal}
                onClose={closeShowWaiterModal}
                aria-labelledby="alert-dialog-title"
                fullWidth
                maxWidth="sm"
                aria-describedby="alert-dialog-description"
            >

                <div className="container">
                    <DialogTitle id="alert-dialog-title" sx={{ float: "left" }}>
                        Waiter details
                    </DialogTitle>
                    <DialogActions>
                        <Button color="error" onClick={closeShowWaiterModal}>
                            <CloseIcon />
                        </Button>
                    </DialogActions>
                </div>

                <DialogContent>
                    <TextField fullWidth label="From" required sx={{ marginBottom: "1rem" }} />
                    <TextField
                        sx={{ marginBottom: "1rem" }}
                        fullWidth
                        label="Type"
                        select
                        variant="outlined"
                    >
                        <MenuItem value="1">Zomato</MenuItem>
                        <MenuItem value="2">Swiggy</MenuItem>
                        <MenuItem value="3">Restaurant</MenuItem>
                    </TextField>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date"
                            renderInput={(params) => (
                                <TextField sx={{ marginBottom: "1rem" }} fullWidth {...params} />
                            )}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                            label="Time"
                            renderInput={(params) => (
                                <TextField fullWidth sx={{ marginBottom: "1rem" }} {...params} />
                            )}
                        />
                    </LocalizationProvider>
                    <TextField fullWidth label="Order number" type="number" required sx={{ marginBottom: "1rem" }} />

                    {/* If type is "Restaurant" then enable this */}
                    <TextField fullWidth label="Table" type="number" required sx={{ marginBottom: "1rem" }} disabled />


                    <TextField fullWidth label="Amount" type="number" required sx={{ marginBottom: "1rem" }} />
                </DialogContent>

                <DialogActions>
                    <Button color="error" onClick={closeShowWaiterModal} autoFocus>
                        Close
                    </Button>
                    <Button autoFocus>
                        Submit
                    </Button>
                </DialogActions>

            </Dialog>


            <Head>
                <title>
                    Dashboard: Waiters | Material Kit Pro
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                    p: 2
                }}
            >
                <Container maxWidth="xl" >
                    <Grid
                        container
                        justifyContent="space-between"
                        spacing={2}
                    >
                        <Grid item>
                            <Typography variant="h4">
                                Waiters
                            </Typography>
                        </Grid>
                        <Grid item>
                            {/* <Button
                                startIcon={<PlusIcon fontSize="small" />}
                                variant="contained"
                            >
                                Add
                            </Button> */}
                        </Grid>
                    </Grid>

                    {/* Waiter cards */}
                    <Grid container spacing={1} sx={{ p: 1 }}>

                        {/* Card 1 */}
                        <Grid item xs={6} sm={4} lg={3}>
                            <Paper
                                elevation={12}
                                fullWidth
                                sx={{ display: "flex", flexDirection: "column", p: 1, height: "100%" }}
                            >

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        p: 1
                                    }}
                                >
                                    <Typography variant="body1">From</Typography>
                                    <Typography
                                        variant="subtitle1"
                                        color="error"
                                    >
                                        Zomato
                                    </Typography>
                                </Box>
                                <Divider />
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        p: 1
                                    }}
                                >
                                    <Typography variant="body1">Type</Typography>
                                    <Typography variant="subtitle1">Delivery</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        p: 1
                                    }}
                                >
                                    <Typography variant="body1">Date</Typography>
                                    <Typography variant="subtitle1">15-02-2022</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        p: 1
                                    }}
                                >
                                    <Typography variant="body1">Time</Typography>
                                    <Typography variant="subtitle1">15:08</Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        p: 1
                                    }}
                                >
                                    <Typography variant="body1">Order No.</Typography>
                                    <Typography variant="subtitle1">1</Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        p: 1
                                    }}
                                >
                                    <Typography variant="body1">Amount</Typography>
                                    <Typography variant="subtitle1">1000.5</Typography>
                                </Box>
                                <Box sx={{ display: "flex", flexGrow: 1, alignItems: "flex-end" }}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        fullWidth
                                        onClick={() => {
                                            setShowWaiterModal(true)
                                        }}
                                    >
                                        View Details
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>

                        {/* Card 2 */}
                        <Grid item xs={6} sm={4} lg={3}>
                            <Paper
                                elevation={12}
                                fullWidth
                                sx={{ display: "flex", flexDirection: "column", p: 1, height: "100%" }}
                            >

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        p: 1
                                    }}
                                >
                                    <Typography variant="body1">From</Typography>
                                    <Typography
                                        variant="subtitle1"
                                        color="success.dark"
                                    >
                                        Restaurant
                                    </Typography>
                                </Box>
                                <Divider />
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        p: 1
                                    }}
                                >
                                    <Typography variant="body1">Type</Typography>
                                    <Typography variant="subtitle1">Delivery</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        p: 1
                                    }}
                                >
                                    <Typography variant="body1">Date</Typography>
                                    <Typography variant="subtitle1">15-02-2022</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        p: 1
                                    }}
                                >
                                    <Typography variant="body1">Time</Typography>
                                    <Typography variant="subtitle1">15:08</Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        p: 1
                                    }}
                                >
                                    <Typography variant="body1">Order No.</Typography>
                                    <Typography variant="subtitle1">1</Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        p: 1
                                    }}
                                >
                                    <Typography variant="body1">Table</Typography>
                                    <Typography variant="subtitle1">1</Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        p: 1
                                    }}
                                >
                                    <Typography variant="body1">Amount</Typography>
                                    <Typography variant="subtitle1">1000.5</Typography>
                                </Box>
                                <Box sx={{ display: "flex", flexGrow: 1, alignItems: "flex-end" }}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        fullWidth
                                        onClick={() => {
                                            setShowWaiterModal(true)
                                        }}
                                    >
                                        View Details
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Navigation bar */}
            {/* Connect to the router*/}
            <AppBar
                position="sticky"
                sx={{
                    top: "auto",
                    bottom: 0,
                    boxShadow: "0 -2px 10px rgba(0,0,0,0.3)",
                    backgroundColor: "white"
                }}
            >
                <Toolbar sx={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    <IconButton
                        size="large"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                    >
                        <Badge badgeContent={10} color="error">
                            <Restaurant />
                        </Badge>
                        <Typography variant="caption">Order</Typography>
                    </IconButton>

                    <IconButton
                        size="large"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                    >
                        <Badge badgeContent={10} color="error">
                            <Restaurant />
                        </Badge>
                        <Typography variant="caption">(Placeholder)</Typography>
                    </IconButton>

                    <IconButton
                        size="large"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                    >
                        <Badge badgeContent={10} color="error">
                            <Restaurant />
                        </Badge>
                        <Typography variant="caption">(Placeholder)</Typography>
                    </IconButton>

                </Toolbar>

            </AppBar>
        </>
    );
};

export default Waiters;
