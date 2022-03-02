import React, { useCallback, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import {
    Box,
    Button,
    Grid,
    Container,
    Table,
    TableBody,
    TableCell,
    TablePagination,
    TableContainer,
    TableRow,
    Typography,
    Dialog,
    DialogContent, DialogActions, DialogTitle
} from '@mui/material';
import TableHead from '@mui/material/TableHead';
import { AuthGuard } from '../../components/authentication/auth-guard';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { Plus as PlusIcon } from '../../icons/plus';
import Paper from '@mui/material/Paper';
import { IconButton, Tooltip, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DatePicker, TimePicker } from "@mui/lab";
import Chip from '@mui/material/Chip';

const Coupons = () => {
    // For add reservation dialog box
    let [addReservationModal, setAddReservationModal] = useState(false)

    function closeAddReservationModal() {
        setAddReservationModal(false)
    }

    // States for adding a new reservation
    const [dateValue, setDateValue] = React.useState(new Date());
    const [sTimeValue, setStimeValue] = React.useState(new Date().getTime());
    const [eTimevalue, setEtimeValue] = React.useState(new Date().getTime());
    let [numberOfPeople, setNumberOfPeople] = useState(0)

    return (
        <>
            <Dialog
                open={addReservationModal}
                onClose={closeAddReservationModal}
                aria-labelledby="alert-dialog-title"
                fullWidth
                maxWidth="sm"
                aria-describedby="alert-dialog-description"
            >

                <div className="container">
                    <DialogTitle id="alert-dialog-title" sx={{ float: "left" }}>
                        Add new Coupons
                    </DialogTitle>
                    <DialogActions>
                        <Button color="error" onClick={closeAddReservationModal}>
                            <CloseIcon />
                        </Button>
                    </DialogActions>
                </div>

                <DialogContent>
                    <TextField fullWidth label="Title" required sx={{ marginBottom: "1rem" }}
                    />
                    
                    
                    <TextField fullWidth label="Discount" required sx={{ marginBottom: "1rem" }}
                        value={numberOfPeople}
                        onChange={(e) => {
                            setNumberOfPeople(e.target.value)
                        }}
                    />
                </DialogContent>

                <DialogActions>
                    <Button color="error" onClick={closeAddReservationModal} autoFocus>
                        Close
                    </Button>
                    <Button autoFocus>
                        Submit
                    </Button>
                </DialogActions>

            </Dialog>

            <Head>
                <title>
                    Dashboard: Coupons
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="lg">
                    <Grid
                        container
                        justifyContent="space-between"
                        spacing={3}
                    >
                        <Grid item>
                            <Typography variant="h4">
                                Coupons
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                startIcon={<PlusIcon fontSize="small" />}
                                variant="contained"
                                onClick={() => {
                                    setAddReservationModal(true)
                                }}
                            >
                                Add Coupons
                            </Button>
                        </Grid>
                    </Grid>
                    <TableContainer component={Paper} sx={{ m: 1 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>S.No </TableCell>
                                    <TableCell>Coupon Name </TableCell>
                                    <TableCell>Discount</TableCell>
                                    <TableCell >Action</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>


                                <TableRow
                                    hover
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <TableCell >
                                        1
                                    </TableCell>

                                    <TableCell >
                                        TEST COUPON
                                    </TableCell>

                                    <TableCell >
                                        30%
                                    </TableCell>

                                    <TableCell >
                                        <Tooltip title="Edit">
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton color="error" aria-label="upload picture" component="span">
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>

                                <TableRow
                                    hover
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <TableCell >
                                        2
                                    </TableCell>

                                    <TableCell >
                                        TEST COUPON
                                    </TableCell>

                                    <TableCell >
                                        30%
                                    </TableCell>

                                    <TableCell >
                                        <Tooltip title="Edit">
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton color="error" aria-label="upload picture" component="span">
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>


                            </TableBody>
                        </Table>
                    </TableContainer>

                </Container>
            </Box>
        </>
    );
};

Coupons.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            {page}
        </DashboardLayout>
    </AuthGuard>
);

export default Coupons;
