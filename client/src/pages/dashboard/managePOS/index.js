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
    DialogContent, DialogActions, DialogTitle,
    IconButton,
    TextField,
    AppBar,
    Tabs,
    Tab,
    FormControl,
    FormControlLabel,
    outlinedInputClasses,
    inputLabelClasses,
    Radio,
    RadioGroup
} from '@mui/material';
import TableHead from '@mui/material/TableHead';
import { AuthGuard } from '../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { Plus as PlusIcon } from '../../../icons/plus';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DatePicker, TimePicker } from "@mui/lab";
import { styled } from "@mui/material/styles";
import {
    ExpandLess,
    ExpandMore,
    Search,
    PersonOutline,
    People,
    NoteAlt,
    Restaurant,
    Add,
    Remove,
    Delete
} from "@mui/icons-material";
import { makeStyles } from "@material-ui/core";
import Scrollbar from "../../../components/Scrollbar";
import TableBarIcon from '@mui/icons-material/TableBar';

const useStyles = makeStyles((theme) => ({
    sideFoodMenu: {
        backgroundColor: theme.palette.mode === "light" ? "transparent" : "transparent",
    },
    section3BillSection: {
        backgroundColor: theme.palette.mode === "light" ? "#DFE3E8" : "#212B36"
    },
    appbar: {
        backgroundColor: theme.palette.mode === "light" ? "#DFE3E8" : "#212B36",
        color: theme.palette.mode === "light" ? "#000" : "#fff"
    },
    input: {
        color: "#fff"
    },
    modal: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 1000,
        borderRadius: 10,
        boxShadow: 24,
        padding: 20,
        backgroundColor: theme.palette.mode === "light" ? "#fff" : "#212B36"
    },
    detailsModal: {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        borderRadius: 10,
        boxShadow: 24,
        padding: 20,
        backgroundColor: theme.palette.mode === "light" ? "#fff" : "#212B36"
    }
}));

const TableGrid = styled(Grid)(({ theme }) => ({
    ["@media (max-height:600px)"]: {
        maxHeight: 200
    },
    ["@media (min-height:600px)"]: {
        maxHeight: 200
    },
    ["@media (min-height:800px)"]: {
        maxHeight: 250
    },
    ["@media (min-height:900px)"]: {
        maxHeight: 300
    },
    ["@media (min-height:1080px)"]: {
        maxHeight: 340
    }
}));

const CustomColor = styled(Typography)(({ theme }) => ({
    // background: "-webkit-linear-gradient(-45deg, #FF4842 , #3366FF )",
    background: "-webkit-linear-gradient(-45deg, #007B55 , #FFC107 )",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
}));


const ManagePOS = () => {
    const [openSideMenu, setOpenSideMenu] = React.useState(true);
    const [openTableModal, setOpenTableModal] = React.useState(false);
    const [openDetailsModal, setOpenDetailsModal] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [tabValue, setTabValue] = React.useState("dine-in");
    const [vegValue, setVegValue] = React.useState("veg");

    const onTableModalOpenHandler = () => {
        setOpenTableModal(true);
    };
    const onTableModalCloseHandler = () => {
        setOpenTableModal(false);
    };

    const onDetailsModalOpenHandler = () => {
        setOpenDetailsModal(true);
    };
    const onDetailsModalCloseHandler = () => {
        setOpenDetailsModal(false);
    };

    const sideMenuClickHandler = () => {
        setOpenSideMenu(!openSideMenu);
    };

    const onTabChangeHandler = (event, newValue) => {
        setTabValue(newValue);
    };

    const onVegChangeHandler = (event, newValue) => {
        setVegValue(newValue);
    };

    const onSelectItem = (event, index) => {
        setSelectedIndex(index);
    };

    const classes = useStyles();

    return (
        <>
            <Head>
                <title>
                    Dashboard: Manage POS | Material Kit Pro
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="xl" fullWidth>
                    <Grid
                        container
                        justifyContent="space-between"
                        spacing={3}>
                        <Grid item>
                            <Typography variant="h4">
                                Manage POS
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} direction="row" margin={1}>
                        <Grid
                            item
                            container
                            xs={5}
                            direction="column"
                        >
                            <Grid
                                item
                                container
                                className={classes.sideFoodMenu}
                                sx={{ boxSizing: "border-box", padding: 1 }}
                            >
                                <Grid item xs={12} padding={0.2}>
                                    <TextField
                                        // sx={{ input: { color: 'white' } }}
                                        fullWidth
                                        variant="standard"
                                        size="small"
                                        placeholder="Search Item"
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                item
                                container
                                spacing={2}
                                style={{ boxSizing: "border-box", padding: "10px 20px" }}
                                align="center"
                            >
                                <Grid item xs={3}>
                                    <Paper
                                        fullWidth
                                        elevation={6}
                                        style={{
                                            height: 75,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Typography>food</Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={3}>
                                    <Paper
                                        fullWidth
                                        elevation={12}
                                        style={{
                                            height: 75,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Typography>food</Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={3}>
                                    <Paper
                                        fullWidth
                                        elevation={12}
                                        style={{
                                            height: 75,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Typography>food</Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={3}>
                                    <Paper
                                        fullWidth
                                        elevation={12}
                                        style={{
                                            height: 75,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Typography>food</Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={3}>
                                    <Paper
                                        fullWidth
                                        elevation={12}
                                        style={{
                                            height: 75,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Typography>food</Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={3}>
                                    <Paper
                                        fullWidth
                                        elevation={12}
                                        style={{
                                            height: 75,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Typography>food</Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>


                        {/* Third Section */}
                        <Grid
                            item
                            container
                            xs={6.5}
                            direction="column"
                            sx={{ height: "100%" }}
                        >
                            {/* Tabs */}
                            <Grid item container>
                                <AppBar position="sticky" className={classes.appbar}>
                                    <Tabs
                                        value={tabValue}
                                        onChange={onTabChangeHandler}
                                        textColor="#00AB55"
                                        indicatorColor="primary"
                                        variant="fullWidth"
                                    >
                                        <Tab label="Dine In" value="dine-in" sx={{ borderRadius: 0 }} />
                                        <Tab label="Delivery" value="delivery" sx={{ borderRadius: 0 }} />
                                        <Tab label="Pick Up" value="pick-up" sx={{ borderRadius: 0 }} />
                                    </Tabs>
                                </AppBar>
                            </Grid>

                            <Grid item container sx={{ borderBottom: "1px solid", borderColor: "grey.800" }}>
                                <Grid item xs={1}>
                                    <IconButton >
                                        <TableBarIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>

                            {/* Table grid */}

                            <TableGrid
                                item
                                container
                                sx={{
                                    boxSizing: "border-box",
                                    padding: 1
                                }}
                                style={{
                                    // height: "20rem",
                                    overflowY: "scroll"
                                }}
                            >
                                <Table
                                    size="small"
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Items</TableCell>
                                            <TableCell align="center">Price</TableCell>
                                            <TableCell align="center">Qty.</TableCell>
                                            <TableCell align="center">Total</TableCell>
                                            <TableCell align="center">Remove</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Food</TableCell>
                                            <TableCell align="center">80.00</TableCell>
                                            <TableCell align="center">
                                                <IconButton size="small" sx={{ color: "error.main" }}>
                                                    <Remove />
                                                </IconButton>
                                                <Typography variant="body2" component="span" sx={{ margin: "0 10px" }}>
                                                    1
                                                </Typography>
                                                <IconButton size="small" color="primary">
                                                    <Add />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="center">80.00</TableCell>
                                            <TableCell align="center">
                                                <IconButton size="small" sx={{ color: "error.main" }}>
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Food</TableCell>
                                            <TableCell align="center">80.00</TableCell>
                                            <TableCell align="center">
                                                <IconButton size="small" sx={{ color: "error.main" }}>
                                                    <Remove />
                                                </IconButton>
                                                <Typography variant="body2" component="span" sx={{ margin: "0 10px" }}>
                                                    1
                                                </Typography>
                                                <IconButton size="small" color="primary">
                                                    <Add />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="center">80.00</TableCell>
                                            <TableCell align="center">
                                                <IconButton size="small" sx={{ color: "error.main" }}>
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Food</TableCell>
                                            <TableCell align="center">80.00</TableCell>
                                            <TableCell align="center">
                                                <IconButton size="small" sx={{ color: "error.main" }}>
                                                    <Remove />
                                                </IconButton>
                                                <Typography variant="body2" component="span" sx={{ margin: "0 10px" }}>
                                                    1
                                                </Typography>
                                                <IconButton size="small" color="primary">
                                                    <Add />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="center">80.00</TableCell>
                                            <TableCell align="center">
                                                <IconButton size="small" sx={{ color: "error.main" }}>
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Food</TableCell>
                                            <TableCell align="center">80.00</TableCell>
                                            <TableCell align="center">
                                                <IconButton size="small" sx={{ color: "error.main" }}>
                                                    <Remove />
                                                </IconButton>
                                                <Typography variant="body2" component="span" sx={{ margin: "0 10px" }}>
                                                    1
                                                </Typography>
                                                <IconButton size="small" color="primary">
                                                    <Add />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="center">80.00</TableCell>
                                            <TableCell align="center">
                                                <IconButton size="small" sx={{ color: "error.main" }}>
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Food</TableCell>
                                            <TableCell align="center">80.00</TableCell>
                                            <TableCell align="center">
                                                <IconButton size="small" sx={{ color: "error.main" }}>
                                                    <Remove />
                                                </IconButton>
                                                <Typography variant="body2" component="span" sx={{ margin: "0 10px" }}>
                                                    1
                                                </Typography>
                                                <IconButton size="small" color="primary">
                                                    <Add />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="center">80.00</TableCell>
                                            <TableCell align="center">
                                                <IconButton size="small" sx={{ color: "error.main" }}>
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Food</TableCell>
                                            <TableCell align="center">80.00</TableCell>
                                            <TableCell align="center">
                                                <IconButton size="small" sx={{ color: "error.main" }}>
                                                    <Remove />
                                                </IconButton>
                                                <Typography variant="body2" component="span" sx={{ margin: "0 10px" }}>
                                                    1
                                                </Typography>
                                                <IconButton size="small" color="primary">
                                                    <Add />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="center">80.00</TableCell>
                                            <TableCell align="center">
                                                <IconButton size="small" sx={{ color: "error.main" }}>
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Food</TableCell>
                                            <TableCell align="center">80.00</TableCell>
                                            <TableCell align="center">
                                                <IconButton size="small" sx={{ color: "error.main" }}>
                                                    <Remove />
                                                </IconButton>
                                                <Typography variant="body2" component="span" sx={{ margin: "0 10px" }}>
                                                    1
                                                </Typography>
                                                <IconButton size="small" color="primary">
                                                    <Add />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="center">80.00</TableCell>
                                            <TableCell align="center">
                                                <IconButton size="small" sx={{ color: "error.main" }}>
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Food</TableCell>
                                            <TableCell align="center">80.00</TableCell>
                                            <TableCell align="center">
                                                <IconButton size="small" sx={{ color: "error.main" }}>
                                                    <Remove />
                                                </IconButton>
                                                <Typography variant="body2" component="span" sx={{ margin: "0 10px" }}>
                                                    1
                                                </Typography>
                                                <IconButton size="small" color="primary">
                                                    <Add />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="center">80.00</TableCell>
                                            <TableCell align="center">
                                                <IconButton size="small" sx={{ color: "error.main" }}>
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Food</TableCell>
                                            <TableCell align="center">80.00</TableCell>
                                            <TableCell align="center">
                                                <IconButton size="small" sx={{ color: "error.main" }}>
                                                    <Remove />
                                                </IconButton>
                                                <Typography variant="body2" component="span" sx={{ margin: "0 10px" }}>
                                                    1
                                                </Typography>
                                                <IconButton size="small" color="primary">
                                                    <Add />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="center">80.00</TableCell>
                                            <TableCell align="center">
                                                <IconButton size="small" sx={{ color: "error.main" }}>
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableGrid>

                            {/* Bottom controls */}
                            <Grid item container sx={{ position: "sticky", bottom: 0 }} direction="column">
                                <Grid
                                    item
                                    container
                                    className={classes.section3BillSection}
                                    sx={{
                                        boxSizing: "border-box",
                                        padding: "20px 10px",
                                        color: "white"
                                    }}
                                >
                                    <Grid item container xs={4} direction="column" rowSpacing={1}>
                                        <Grid item>Discount : 5%</Grid>
                                        <Grid item>Service charge : 80</Grid>
                                    </Grid>
                                    <Grid item container xs={3} direction="column" rowSpacing={1}>
                                        <Grid item>SGST : 80</Grid>
                                        <Grid item>CGST : 80</Grid>
                                    </Grid>
                                    <Grid item container xs={5} direction="column" rowSpacing={1}>
                                        <Grid item>Sub Total : 80</Grid>
                                        <Grid item>Total Amount Payable : 180</Grid>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-around"
                                    }}
                                >
                                    <FormControl>
                                        <RadioGroup row>
                                            <FormControlLabel value="cash" control={<Radio defaultChecked />} label="Cash" />
                                            <FormControlLabel value="card" control={<Radio />} label="Card" />
                                            <FormControlLabel value="due" control={<Radio />} label="Due" />
                                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                                            <FormControlLabel value="part" control={<Radio />} label="Part" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid
                                    className={classes.section3BillSection}
                                    item
                                    container
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-around",
                                        alignItems: "center",
                                        padding: 1
                                    }}
                                >
                                    <Button variant="contained" sx={{ margin: 0.2 }}>Split</Button>
                                    <Button variant="outlined" sx={{
                                        margin: 0.2,
                                        backgroundColor: "white",
                                        "&:hover": {
                                            backgroundColor: "#ffffffe9"
                                        }
                                    }}>KOT</Button>
                                    <Button variant="contained" sx={{ margin: 0.2 }}>E-Bill</Button>
                                    <Button variant="outlined" sx={{
                                        margin: 0.2,
                                        backgroundColor: "white",
                                        "&:hover": {
                                            backgroundColor: "#ffffffe9"
                                        }
                                    }}>Pause Order</Button>
                                    <Button variant="contained" sx={{ margin: 0.2 }}>Cancel Order</Button>
                                    <Button variant="outlined" sx={{
                                        margin: 0.2,
                                        backgroundColor: "white",
                                        "&:hover": {
                                            backgroundColor: "#ffffffe9"
                                        }
                                    }}>Modify</Button>
                                </Grid>
                                {/* Bottom Table */}
                                <Grid item container sx={{ boxSizing: "border-box", padding: 1 }}>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">Orders</TableCell>
                                                <TableCell align="center">Preparing</TableCell>
                                                <TableCell align="center">Ready</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="center">7</TableCell>
                                                <TableCell align="center">5</TableCell>
                                                <TableCell align="center">4</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

ManagePOS.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            {page}
        </DashboardLayout>
    </AuthGuard>
);

export default ManagePOS;

