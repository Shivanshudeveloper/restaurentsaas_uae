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

const Category = () => {
    // For add reservation dialog box
    let [addReservationModal, setAddReservationModal] = useState(false)

    function closeAddReservationModal() {
        setAddReservationModal(false)
    }

    // States for adding a new reservation
    const userId = useSessionStorage("userId")
    let [toggler, setToggler] = useState(false)


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


    const [categoryname, setcategoryname] = React.useState("");
    const [allcategories, setallcategories] = React.useState([]);


    useEffect(() => {
        axios.get(`${API_SERVICE}/getcategorydata`)
            .then(res => {
                setallcategories(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    },[]);


    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addCategory = () => {
        var userEmail = sessionStorage.getItem("userEmail");
        var userId = sessionStorage.getItem("userId");
        var uploadData = {
            categoryname,
            userEmail,
            userId
        }
        axios.post(`${API_SERVICE}/addcategorydata`, uploadData)
            .then((response) => {
                if (response.status === 200) {
                    alert("Category Item");
                    closeAddReservationModal();
                    setcategoryname("");
                    window.location.reload();
                }
            }).catch(err => console.log(err));
    }

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
                        Menu :
                    </DialogTitle>
                    <DialogActions>
                        <Button color="error" onClick={closeAddReservationModal}>
                            <CloseIcon />
                        </Button>
                    </DialogActions>
                </div>

                <DialogContent>
                    <TextField 
                        fullWidth
                        value={categoryname}
                        onChange={(e) => setcategoryname(e.target.value)}
                        variant='outlined'
                        label="Category Name"
                    />
                </DialogContent>

                <DialogActions>
                    <Button color="error" onClick={closeAddReservationModal} autoFocus>
                        Close
                    </Button>
                    <Button autoFocus onClick={addCategory}>
                        Submit
                    </Button>
                </DialogActions>

            </Dialog>


            <Head>
                <title>
                    Category
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
                    <Grid
                        container
                        justifyContent="space-between"
                        spacing={3}
                    >
                        <Grid item>
                            <Typography variant="h4">
                                Category
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
                                    <TableCell align="center" >S.No </TableCell>
                                    <TableCell align="center"  >Category</TableCell>
                                    <TableCell align="center"  >Action</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>


                                {allcategories.map((row, i) => {

                                    return <TableRow
                                        hover
                                        key={row._id}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell align="center">
                                            {i + 1}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.categoryname}
                                        </TableCell>


                                        <TableCell align="center">
                                            <Tooltip title="Edit">
                                                <IconButton
                                                    color="primary"
                                                    aria-label="upload picture"
                                                    component="span"
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

Category.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            {page}
        </DashboardLayout>
    </AuthGuard>
);

export default Category;
