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
import axios from "axios"
import { API_SERVICE } from '../../../config';
import useSessionStorage from '../../../hooks/useSessionStorage';

const Reservations = () => {
    // For add reservation dialog box
    let [addReservationModal, setAddReservationModal] = useState(false)

    function closeAddReservationModal() {
        setAddReservationModal(false)
    }

    // States for adding a new reservation
    const userId = useSessionStorage("userId")
    let [toggler, setToggler] = useState(false)
    const [dateValue, setDateValue] = React.useState(new Date());
    const [sTimeValue, setStimeValue] = React.useState(new Date().getTime());
    const [eTimevalue, setEtimeValue] = React.useState(new Date().getTime());

    let [newReservation, setNewReservation] = useState({
        name: "",
        numberOfPeople: 1,
    })

    function addReservation() {
        if (!userId)
            return

        if (!newReservation.name || !newReservation.numberOfPeople || !dateValue || !sTimeValue || !eTimevalue)
            return

        axios.post(`${API_SERVICE}/add_reservation`, {
            ...newReservation,
            userId,
            start: sTimeValue,
            end: eTimevalue,
            date: dateValue
        })
            .then(res => {
                console.log(res.data)
                setToggler(!toggler)
                closeAddReservationModal()
                setNewReservation({
                    name: "",
                    numberOfPeople: 1,
                })
            })
            .catch(err => { console.log(err) })
    }

    let [reservations, setReservations] = useState([])

    useEffect(() => {
        if (!userId)
            return

        axios.get(`${API_SERVICE}/get_reservations/${userId}`)
            .then(res => {
                console.log(res.data)
                setReservations(res.data.reverse())
            })
            .catch(err => { console.log(err) })

    }, [userId, toggler])


    function getFormattedDate(date) {
        date = new Date(date)
        var year = date.getFullYear();

        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;

        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;

        return day + '/' + month + '/' + year;
    }

    // Editing a reservation
    let [reservationId, setReservationId] = useState()
    let [reservationToEdit, setReservationToEdit] = useState({
        name: "",
        numberOfPeople: ""
    })

    const [dateValueToEdit, setDateValueToEdit] = React.useState(new Date());
    const [sTimeValueToEdit, setStimeValueToEdit] = React.useState(new Date().getTime());
    const [eTimevalueToEdit, setEtimeValueToEdit] = React.useState(new Date().getTime());

    useEffect(() => {
        if (!userId || !reservationId)
            return
        axios.get(`${API_SERVICE}/get_reservation_by_id/${reservationId}/${userId}`)
            .then(res => {
                setReservationToEdit(
                    {
                        name: res.data.name,
                        numberOfPeople: res.data.numberOfPeople
                    })
                setDateValueToEdit(res.data.date)
                setStimeValueToEdit(res.data.start)
                setEtimeValueToEdit(res.data.end)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [reservationId])


    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function editReservation() {
        if (!userId || !reservationId)
            return

        if (!reservationToEdit.name || !reservationToEdit.numberOfPeople || !dateValueToEdit || !sTimeValueToEdit || !eTimevalueToEdit)
            return

        let baseURL = `${API_SERVICE}/edit_reservation/${reservationId}/${userId}`;

        axios.patch(baseURL, {
            ...reservationToEdit,
            date: dateValueToEdit,
            start: sTimeValueToEdit,
            end: eTimevalueToEdit
        })
            .then((res) => {
                setToggler(!toggler)
                handleClose()
            })
            .catch((err) => { throw err })
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={closeAddReservationModal}
                aria-labelledby="alert-dialog-title"
                fullWidth
                maxWidth="sm"
                aria-describedby="alert-dialog-description"
            >

                <div className="container">
                    <DialogTitle id="alert-dialog-title" sx={{ float: "left" }}>
                        Reservation :
                    </DialogTitle>
                    <DialogActions>
                        <Button color="error" onClick={closeAddReservationModal}>
                            <CloseIcon />
                        </Button>
                    </DialogActions>
                </div>

                <DialogContent>
                    <TextField fullWidth label="Customer Name" required sx={{ marginBottom: "1rem" }}
                        value={reservationToEdit.name}
                        name="name"
                        onChange={(e) => {
                            let { name, value } = e.target

                            setReservationToEdit((prev) => {
                                return {
                                    ...prev,
                                    [name]: value
                                }
                            })
                        }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date of reservation"
                            value={dateValueToEdit}
                            onChange={(newValue) => {
                                setDateValueToEdit(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField sx={{ marginBottom: "1rem" }} fullWidth {...params} />
                            )}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                            label="Start Time"
                            value={sTimeValueToEdit}
                            onChange={(newValue) => {
                                setStimeValueToEdit(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField fullWidth sx={{ marginBottom: "1rem" }} {...params} />
                            )}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                            label="End Time"
                            value={eTimevalueToEdit}
                            onChange={(newValue) => {
                                setEtimeValueToEdit(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField fullWidth sx={{ marginBottom: "1rem" }} {...params} />
                            )}
                        />
                    </LocalizationProvider>
                    <TextField fullWidth label="Number of people?" required sx={{ marginBottom: "1rem" }}
                        value={reservationToEdit.numberOfPeople}
                        name="numberOfPeople"
                        type="number"
                        onChange={(e) => {
                            let { name, value } = e.target

                            setReservationToEdit((prev) => {
                                return {
                                    ...prev,
                                    [name]: value
                                }
                            })
                        }}
                    />
                </DialogContent>

                <DialogActions>
                    <Button color="error" onClick={handleClose} autoFocus>
                        Close
                    </Button>
                    <Button autoFocus onClick={editReservation}>
                        Submit
                    </Button>
                </DialogActions>

            </Dialog>


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
                    <TextField fullWidth label="Customer Name" required sx={{ marginBottom: "1rem" }}
                        value={newReservation.name}
                        name="name"
                        onChange={(e) => {
                            let { name, value } = e.target

                            setNewReservation((prev) => {
                                return {
                                    ...prev,
                                    [name]: value
                                }
                            })
                        }}
                    />
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
                        value={newReservation.numberOfPeople}
                        name="numberOfPeople"
                        type="number"
                        onChange={(e) => {
                            let { name, value } = e.target

                            setNewReservation((prev) => {
                                return {
                                    ...prev,
                                    [name]: value
                                }
                            })
                        }}
                    />
                </DialogContent>

                <DialogActions>
                    <Button color="error" onClick={closeAddReservationModal} autoFocus>
                        Close
                    </Button>
                    <Button autoFocus onClick={() => {
                        setNewReservation((prev) => {
                            return {
                                ...prev,
                            }
                        })
                        addReservation()
                    }}>
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
                                    <TableCell >Action</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>


                                {reservations.map((row, i) => {

                                    return <TableRow
                                        hover
                                        key={row._id}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell align="center">
                                            {i + 1}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.name}
                                        </TableCell>

                                        <TableCell align="center">
                                            {row.numberOfPeople}
                                        </TableCell>

                                        <TableCell align="center">
                                            {new Date(row.start).toLocaleTimeString('en-US')}
                                        </TableCell>

                                        <TableCell align="center">
                                            {new Date(row.end).toLocaleTimeString('en-US')}
                                        </TableCell>

                                        <TableCell align="center">
                                            {getFormattedDate(row.date)}
                                        </TableCell>


                                        <TableCell align="center">
                                            <Tooltip title="Edit">
                                                <IconButton
                                                    color="primary"
                                                    aria-label="upload picture"
                                                    component="span"
                                                    onClick={() => {
                                                        setReservationId(row._id)
                                                        handleOpen()
                                                    }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton
                                                    onClick={() => {
                                                        axios.delete(`${API_SERVICE}/delete_reservation/${row._id}/${userId}`)
                                                        setToggler(!toggler)
                                                    }}
                                                    color="error"
                                                    aria-label="upload picture"
                                                    component="span">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>

                                })}

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
