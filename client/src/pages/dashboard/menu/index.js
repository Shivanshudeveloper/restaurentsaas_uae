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

const Menu = () => {
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


    const [categoryname, setcategoryname] = React.useState("");
    const [itemname, setitemname] = React.useState("");
    const [price, setprice] = React.useState("");
    const [stock, setstock] = React.useState("");

    const [allcategories, setallcategories] = React.useState([]);
    const [allmenuiteam, setallmenuiteam] = React.useState([]);


    useEffect(() => {
        axios.get(`${API_SERVICE}/getcategorydata`)
            .then(res => {
                setallcategories(res.data);
            })
            .catch(err => {
                console.log(err)
            })

        axios.get(`${API_SERVICE}/getallitemdata`)
            .then(res => {
                setallmenuiteam(res.data);
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

    const addItem = () => {
        var userId = sessionStorage.getItem("userId");
        var uploadData = {
            itemname,
            categoryname,
            price,
            stock,
            userId
        }
        axios.post(`${API_SERVICE}/addmenuitemdata`, uploadData)
            .then((response) => {
                if (response.status === 200) {
                    alert("Item Added");
                    closeAddReservationModal();
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
                        value={itemname}
                        onChange={(e) => setitemname(e.target.value)}
                        sx={{ mb: 2 }}
                        variant='outlined'
                        label="Item Name"
                    />
                    <select
                        style={{
                            width: '100%',
                            padding: '17px',
                            fontSize: '16px',
                            borderRadius: '10px'
                        }}
                        name="timezone_offset"
                        id="timezone-offset"
                        onChange={(e) => setcategoryname(e.target.value)}
                        >
                        <option selected disabled>
                            Select Category
                        </option>
                        {
                            allcategories.map((category) => {
                                
                                return (
                                    <option value={category.categoryname}>
                                        {category.categoryname}
                                    </option>
                                )
                            })
                        }
                    </select>

                    <TextField 
                        fullWidth
                        value={price}
                        onChange={(e) => setprice(e.target.value)}
                        sx={{ mt: 2 }}
                        variant='outlined'
                        label="Price"
                    />

                    <TextField 
                        fullWidth
                        value={stock}
                        onChange={(e) => setstock(e.target.value)}
                        sx={{ mt: 2 }}
                        variant='outlined'
                        label="Stock"
                    />
                </DialogContent>

                <DialogActions>
                    <Button color="error" onClick={closeAddReservationModal} autoFocus>
                        Close
                    </Button>
                    <Button autoFocus onClick={addItem}>
                        Submit
                    </Button>
                </DialogActions>

            </Dialog>


            <Head>
                <title>
                    Add Item
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
                                Menu
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
                                    <TableCell align="center" >Item Name</TableCell>
                                    <TableCell align="center"  >Category</TableCell>
                                    <TableCell align="center"  >Price</TableCell>
                                    <TableCell align="center"  >Stock</TableCell>
                                    <TableCell align="center"  >Action</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>


                                {allmenuiteam.map((row, i) => {

                                    return <TableRow
                                        hover
                                        key={row._id}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell align="center">
                                            {i + 1}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.itemname}
                                        </TableCell>

                                        <TableCell align="center">
                                            {row.categoryname}
                                        </TableCell>


                                        <TableCell align="center">
                                             {row.price} USD
                                        </TableCell>

                                        <TableCell align="center">
                                            {row.stock}
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

Menu.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            {page}
        </DashboardLayout>
    </AuthGuard>
);

export default Menu;
