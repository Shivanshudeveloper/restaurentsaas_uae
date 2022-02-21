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
import { AuthGuard } from '../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { Plus as PlusIcon } from '../../../icons/plus';
import Paper from '@mui/material/Paper';
import { IconButton, Tooltip, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DatePicker, TimePicker } from "@mui/lab";
import Chip from '@mui/material/Chip';

const Reservations = () => {
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
                        Add new reservation
                    </DialogTitle>
                    <DialogActions>
                        <Button color="error" onClick={closeAddReservationModal}>
                            <CloseIcon />
                        </Button>
                    </DialogActions>
                </div>

                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date of reservation"
                            value={dateValue}
                            onChange={(newValue) => {
                                setDateValue(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField sx={{ marginBottom: "1rem" }} fullWidth {...params} />
                            )}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                            label="Start Time"
                            value={sTimeValue}
                            onChange={(newValue) => {
                                setStimeValue(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField fullWidth sx={{ marginBottom: "1rem" }} {...params} />
                            )}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                            label="End Time"
                            value={eTimevalue}
                            onChange={(newValue) => {
                                setEtimeValue(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField fullWidth sx={{ marginBottom: "1rem" }} {...params} />
                            )}
                        />
                    </LocalizationProvider>
                    <TextField fullWidth label="Number of people?" required sx={{ marginBottom: "1rem" }}
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
                    Dashboard: Reservations | Material Kit Pro
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
                                Reservations
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
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                    <TableContainer component={Paper} sx={{ m: 1 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>S.No </TableCell>
                                    <TableCell>Customer Name </TableCell>
                                    <TableCell >Number of people</TableCell>
                                    <TableCell >Start time</TableCell>
                                    <TableCell >End time</TableCell>
                                    <TableCell >Date of reservation</TableCell>
                                    <TableCell >Status</TableCell>
                                    <TableCell >Action</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>

                                <TableRow
                                    hover
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <TableCell align="center">
                                        1
                                    </TableCell>
                                    <TableCell align="center">
                                        Tim
                                    </TableCell>

                                    <TableCell align="center">
                                        3
                                    </TableCell>

                                    <TableCell align="center">
                                        00:00:03
                                    </TableCell>

                                    <TableCell align="center">
                                        00:00:03
                                    </TableCell>

                                    <TableCell align="center">
                                        12/2/22
                                    </TableCell>

                                    <TableCell align="center">
                                        <Chip color="success" label="Free"></Chip>
                                    </TableCell>

                                    <TableCell align="center">
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
                                    <TableCell align="center">
                                        2
                                    </TableCell>

                                    <TableCell align="center">
                                        Tom
                                    </TableCell>

                                    <TableCell align="center">
                                        3
                                    </TableCell>

                                    <TableCell align="center">
                                        00:00:03
                                    </TableCell>

                                    <TableCell align="center">
                                        00:00:03
                                    </TableCell>

                                    <TableCell align="center">
                                        12/2/22
                                    </TableCell>

                                    <TableCell align="center">
                                        <Chip color="warning" label="In review"></Chip>
                                    </TableCell>

                                    <TableCell align="center">
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
                                    <TableCell align="center">
                                        3
                                    </TableCell>
                                    <TableCell align="center">
                                        Tin Tin
                                    </TableCell>

                                    <TableCell align="center">
                                        3
                                    </TableCell>

                                    <TableCell align="center">
                                        00:00:03
                                    </TableCell>

                                    <TableCell align="center">
                                        00:00:03
                                    </TableCell>

                                    <TableCell align="center">
                                        12/2/22
                                    </TableCell>

                                    <TableCell align="center">
                                        <Chip color="success" label="Free"></Chip>
                                    </TableCell>

                                    <TableCell align="center">
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
                                    <TableCell align="center">
                                        4
                                    </TableCell>

                                    <TableCell align="center">
                                        Tan
                                    </TableCell>

                                    <TableCell align="center">
                                        3
                                    </TableCell>

                                    <TableCell align="center">
                                        00:00:03
                                    </TableCell>

                                    <TableCell align="center">
                                        00:00:03
                                    </TableCell>

                                    <TableCell align="center">
                                        12/2/22
                                    </TableCell>

                                    <TableCell align="center">
                                        <Chip color="error" label="Unavailable"></Chip>
                                    </TableCell>

                                    <TableCell align="center">
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

Reservations.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            {page}
        </DashboardLayout>
    </AuthGuard>
);

export default Reservations;
