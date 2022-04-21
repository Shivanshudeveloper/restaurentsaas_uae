import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Transition,
  Dialog,
  Stack
} from "@mui/material";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import axios from "axios"
import { API_SERVICE } from "../../../config"
import useSessionStorage from "../../../hooks/useSessionStorage";

import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DatePicker } from "@mui/lab";
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';

import { ArrowRight as ArrowRightIcon } from "../../../icons/arrow-right";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { gtm } from "../../../lib/gtm";
import { Add, BarChart, Delete, Edit } from "@mui/icons-material";
import Link from "next/link";

import { useFormik } from "formik";
import * as Yup from "yup"

const DineInTable = ({ deleteOrder, userId, toggler, openEditor, getFormattedDate }) => {
  const columns = [
    { label: "Sl", minWidth: 10, maxWidth: 30 },
    { label: "Inv No.", minWidth: 50, maxWidth: 100 },
    { label: "Name", minWidth: 50, maxWidth: 100 },
    { label: "Email", minWidth: 50, maxWidth: 100 },
    { label: "Phone", minWidth: 50, maxWidth: 100 },
    { label: "Waiter", minWidth: 50, maxWidth: 100 },
    { label: "Table", minWidth: 50, maxWidth: 100 },
    { label: "Status", minWidth: 50, maxWidth: 100 },
    { label: "Order Date", minWidth: 50, maxWidth: 100 },
    { label: "Amount", minWidth: 50, maxWidth: 100 },
    { label: "Actions", minWidth: 50, maxWidth: 100 },
  ];

  const createData = (
    invnum,
    name,
    email,
    phone,
    wtr,
    tbl,
    stat,
    date,
    amt
  ) => {
    return { invnum, name, email, phone, wtr, tbl, stat, date, amt };
  };

  const rows = [
    createData(
      "500",
      "Walkin",
      "email@gmail.com",
      "987654321",
      "Rahul Kumar",
      "Table-3",
      "PAID",
      "Nov 20, 2021",
      "2599"
    ),
    createData(
      "400",
      "Walkin",
      "email@gmail.com",
      "987654321",
      "Rahul Kumar",
      "Table-3",
      "PENDING",
      "Nov 20, 2021",
      "2599"
    ),
    createData(
      "300",
      "Walkin",
      "email@gmail.com",
      "987654321",
      "Rahul Kumar",
      "Table-3",
      "PAID",
      "Nov 20, 2021",
      "2599"
    ),
    createData(
      "200",
      "Walkin",
      "email@gmail.com",
      "987654321",
      "Rahul Kumar",
      "Table-3",
      "PENDING",
      "Nov 20, 2021",
      "2599"
    ),
    createData(
      "100",
      "Walkin",
      "email@gmail.com",
      "987654321",
      "Rahul Kumar",
      "Table-3",
      "PENDING",
      "Nov 20, 2021",
      "2599"
    ),
  ];

  let [filteredOrders, setFilteredOrders] = useState([])

  useEffect(() => {
    if (!userId)
      return

    axios.get(`${API_SERVICE}/get_orders_by_type/${userId}/${1}`)
      .then((res) => {
        console.log(res.data)
        setFilteredOrders(res.data.reverse())
      })
      .catch(err => { console.log(err) })

  }, [userId, toggler])

  return (
    <>
      <Grid item container sx={{ mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((column, id) => (
                <TableCell align="center">{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order, id) => (
              <TableRow hover key={order._id} >
                <TableCell align="center">{id + 1}</TableCell>
                <TableCell align="center">{order.invoiceNumber}</TableCell>
                <TableCell align="center">{order.name}</TableCell>
                <TableCell align="center">{order.email}</TableCell>
                <TableCell align="center">{order.phone}</TableCell>
                <TableCell align="center">{order.waiter}</TableCell>
                <TableCell align="center">{order.table}</TableCell>
                <TableCell align="center">{order.status == 1 ? "Pending" : order.status == 2 ? "Completed" : "Canceled"}</TableCell>
                <TableCell align="center">{getFormattedDate(order.orderDate)}</TableCell>
                <TableCell align="center">{order.amount}</TableCell>
                <TableCell align="center">
                  <IconButton size="small" color="primary" onClick={() => { openEditor(order._id) }}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" sx={{ color: "error.main" }}
                    onClick={() => {
                      deleteOrder(order._id)
                    }}>
                    <Delete />
                  </IconButton>
                  <IconButton size="small">
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
            )
            }
          </TableBody>
        </Table>
      </Grid>
    </>
  );
};

// -----------------------------------------
const DeliveryTable = ({ deleteOrder, userId, toggler, openEditor, getFormattedDate }) => {
  const columns = [
    { label: "Sl", minWidth: 10, maxWidth: 30 },
    { label: "Invoice No.", minWidth: 50, maxWidth: 100 },
    { label: "Name", minWidth: 50, maxWidth: 100 },
    { label: "Email", minWidth: 50, maxWidth: 100 },
    { label: "Phone", minWidth: 50, maxWidth: 100 },
    { label: "From", minWidth: 50, maxWidth: 100 },
    { label: "Status", minWidth: 50, maxWidth: 100 },
    { label: "Order Date", minWidth: 50, maxWidth: 100 },
    { label: "Amount", minWidth: 50, maxWidth: 100 },
    { label: "Actions", minWidth: 50, maxWidth: 100 },
  ];

  const createData = (invnum, name, email, phone, frm, stat, date, amt) => {
    return { invnum, name, email, phone, frm, stat, date, amt };
  };

  const rows = [
    createData(
      "500",
      "Walkin",
      "email@gmail.com",
      "987654321",
      "Zomato",
      "PAID",
      "Nov 20, 2021",
      "2599"
    ),
    createData(
      "400",
      "Walkin",
      "email@gmail.com",
      "987654321",
      "Zomato",
      "PENDING",
      "Nov 20, 2021",
      "2599"
    ),
    createData(
      "300",
      "Walkin",
      "email@gmail.com",
      "987654321",
      "Zomato",
      "PAID",
      "Nov 20, 2021",
      "2599"
    ),
  ];

  let [filteredOrders, setFilteredOrders] = useState([])

  useEffect(() => {
    if (!userId)
      return

    axios.get(`${API_SERVICE}/get_orders_by_type/${userId}/${2}`)
      .then((res) => {
        console.log(res.data)
        setFilteredOrders(res.data.reverse())
      })
      .catch(err => { console.log(err) })

  }, [userId, toggler])

  return (
    <>
      <Grid item container sx={{ mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((column, id) => (
                <TableCell align="center">{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order, id) => (
              <TableRow hover key={order._id} >
                <TableCell align="center">{id + 1}</TableCell>
                <TableCell align="center">{order.invoiceNumber}</TableCell>
                <TableCell align="center">{order.name}</TableCell>
                <TableCell align="center">{order.email}</TableCell>
                <TableCell align="center">{order.phone}</TableCell>
                <TableCell align="center">{order.from}</TableCell>
                <TableCell align="center">{order.status == 1 ? "Pending" : order.status == 2 ? "Completed" : "Canceled"}</TableCell>
                <TableCell align="center">{getFormattedDate(order.orderDate)}</TableCell>
                <TableCell align="center">{order.amount}</TableCell>
                <TableCell align="center">
                  <IconButton size="small" color="primary" onClick={() => { openEditor(order._id) }}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" sx={{ color: "error.main" }}
                    onClick={() => {
                      deleteOrder(order._id)
                    }}>
                    <Delete />
                  </IconButton>
                  <IconButton size="small">
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
            )
            }
          </TableBody>
        </Table>
      </Grid>
    </>
  );
};

// ---------------------------
// ---------------------------
const PickupTable = ({ deleteOrder, userId, toggler, openEditor, getFormattedDate }) => {
  const columns = [
    { label: "Sl", minWidth: 10, maxWidth: 30 },
    { label: "Invoice No.", minWidth: 50, maxWidth: 100 },
    { label: "Name", minWidth: 50, maxWidth: 100 },
    { label: "Email", minWidth: 50, maxWidth: 100 },
    { label: "Phone", minWidth: 50, maxWidth: 100 },
    { label: "From", minWidth: 50, maxWidth: 100 },
    { label: "Status", minWidth: 50, maxWidth: 100 },
    { label: "Order Date", minWidth: 50, maxWidth: 100 },
    { label: "Amount", minWidth: 50, maxWidth: 100 },
    { label: "Actions", minWidth: 50, maxWidth: 100 },
  ];

  const createData = (invnum, name, email, phone, frm, stat, date, amt) => {
    return { invnum, name, email, phone, frm, stat, date, amt };
  };

  const rows = [
    createData(
      "500",
      "Walkin",
      "email@gmail.com",
      "987654321",
      "Zomato",
      "PAID",
      "Nov 20, 2021",
      "2599"
    ),
    createData(
      "400",
      "Walkin",
      "email@gmail.com",
      "987654321",
      "Zomato",
      "PENDING",
      "Nov 20, 2021",
      "2599"
    ),
    createData(
      "300",
      "Walkin",
      "email@gmail.com",
      "987654321",
      "Zomato",
      "PAID",
      "Nov 20, 2021",
      "2599"
    ),
  ];

  let [filteredOrders, setFilteredOrders] = useState([])

  useEffect(() => {
    if (!userId)
      return

    axios.get(`${API_SERVICE}/get_orders_by_type/${userId}/${3}`)
      .then((res) => {
        console.log(res.data)
        setFilteredOrders(res.data.reverse())
      })
      .catch(err => { console.log(err) })

  }, [userId, toggler])

  return (
    <>
      <Grid item container sx={{ mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((column, id) => (
                <TableCell align="center">{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order, id) => (
              <TableRow hover key={order._id} >
                <TableCell align="center">{id + 1}</TableCell>
                <TableCell align="center">{order.invoiceNumber}</TableCell>
                <TableCell align="center">{order.name}</TableCell>
                <TableCell align="center">{order.email}</TableCell>
                <TableCell align="center">{order.phone}</TableCell>
                <TableCell align="center">{order.from}</TableCell>
                <TableCell align="center">{order.status == 1 ? "Pending" : order.status == 2 ? "Completed" : "Canceled"}</TableCell>
                <TableCell align="center">{getFormattedDate(order.orderDate)}</TableCell>
                <TableCell align="center">{order.amount}</TableCell>
                <TableCell align="center">
                  <IconButton size="small" color="primary" onClick={() => { openEditor(order._id) }}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" sx={{ color: "error.main" }}
                    onClick={() => {
                      deleteOrder(order._id)
                    }}>
                    <Delete />
                  </IconButton>
                  <IconButton size="small">
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
            )
            }
          </TableBody>
        </Table>
      </Grid>
    </>
  );
};

const OrdersList = () => {

  const userId = useSessionStorage('userId')
  let [toggler, setToggler] = useState(false)

  const [type, setType] = useState(0);
  const handleChange = (event) => {
    setType(event.target.value);
  };

  // State
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  let [orderDate, setOrderDate] = useState(new Date())

  // 1 : Dine in
  // 2 : Delivery
  // 3 : Pickup
  let [orderType, setOrderType] = useState(1)
  let [orderStatus, setOrderStatus] = useState(1)

  const formik = useFormik({
    initialValues: {
      type: 1,
      invoiceNumber: "",
      name: "",
      email: "",
      phone: "",

      // Dine in specific
      waiter: "",
      table: "",

      // Delivery and Pickup specific
      from: "",

      status: 1,
      orderDate: new Date(),
      amount: ""
    },
    validationSchema: Yup.object({
      type: Yup.number().required('Required'),
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      invoiceNumber: Yup.string().required("Required").max(255),
      name: Yup.string().required("Required").max(255),
      phone: Yup.string().required("Required").max(255).matches(phoneRegExp, 'Phone number is not valid'),

      waiter: Yup.string().when('type', {
        is: 1,
        then: Yup.string().required('Required').max(255)
      }),
      table: Yup.string().when('type', {
        is: 1,
        then: Yup.string().required('Required').max(255)
      }),

      from: Yup.string().when('type', {
        is: (type) => type === 2 || type === 3,
        then: Yup.string().required('Required').max(255)
      }),

      status: Yup.number().required("Required").max(255),
      orderDate: Yup.string().required("Required").max(255),
      amount: Yup.string().required("Required").max(255)
    }),
    onSubmit: (values) => {
      if (!userId)
        return

      console.log(values)

      axios.post(`${API_SERVICE}/add_order`, { ...values, userId })
        .then(res => {
          console.log(res.data)
          handleCloseDialog()

          // Reset state
          formik.handleReset()
          setOrderDate(new Date())
          setOrderType(1)

          setToggler(!toggler)
        })
        .catch(err => {
          console.log(err)
        })
    }
  });

  // Fetch all the orders based on userId
  // let [orders, setOrders] = useState([])

  // useEffect(() => {
  //   if (!userId)
  //     return

  //   axios.get(`${API_SERVICE}/get_orders/${userId}`)
  //     .then((res) => {
  //       console.log(res.data)
  //       setOrders(res.data.reverse())
  //     })
  //     .catch(err => { console.log(err) })

  // }, [userId, toggler])

  let [openDialog, setOpenDialog] = useState(false)

  function handleCloseDialog() {
    setOpenDialog(false)
  }

  // Delete an order
  function deleteOrder(orderId) {
    axios.delete(`${API_SERVICE}/delete_order/${orderId}/${userId}`)
      .then(res => {
        console.log(res.data)
        setToggler(!toggler)
      })
      .catch(err => {
        console.log(err)
      })
  }

  // Edit a order
  let [openEditDialog, setOpenEditDialog] = useState(false)
  let [orderId, setOrderId] = useState()
  let [orderToEdit, setOrderToEdit] = useState({
    type: 1,
    invoiceNumber: "",
    name: "",
    email: "",
    phone: "",

    // Dine in specific
    waiter: "",
    table: "",

    // Delivery and Pickup specific
    from: "",

    status: 1,
    orderDate: new Date(),
    amount: ""
  })

  function handleCloseEditor() {
    setOpenEditDialog(false)
  }

  function openEditor(id) {
    console.log(id)
    setOrderId(id)
    setOpenEditDialog(true)
  }

  useEffect(() => {
    if (!orderId || !userId)
      return

    axios.get(`${API_SERVICE}/get_order_by_id/${orderId}/${userId}`)
      .then(res => {
        console.log(res.data)
        setOrderToEdit(res.data)
      })
      .catch(err => {
        console.log(err)
      })

  }, [orderId])

  function editOrder() {
    if (!orderId || !userId)
      return

    // Check if the input fields are vacant if so then display an error message 
    if ((!orderToEdit.name || !orderToEdit.invoiceNumber || !orderToEdit.phone || !orderToEdit.email || !orderToEdit.amount || !orderToEdit.status)
      || (parseInt(orderToEdit.type) === 1 && (!orderToEdit.waiter || !orderToEdit.table))
      || (parseInt(orderToEdit.type) !== 1 && !orderToEdit.from)) {
      setOpen(true);
      return
    }

    axios.patch(`${API_SERVICE}/edit_order/${orderId}/${userId}`, { ...orderToEdit })
      .then(res => {
        console.log(res.data)
        handleCloseEditor()
        setToggler(!toggler)
      })
      .catch(err => {
        console.log(err)
      })
  }

  // Snackbar
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  function getFormattedDate(date) {
    date = new Date(date)
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return day + ' / ' + month + ' / ' + year;
  }

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Input(s) vacant"
        action={action}
      />

      {/* Dialog for editing and adding orders */}
      <Dialog maxWidth="lg" open={openEditDialog} onClose={handleCloseEditor} TransitionComponent={Transition}>
        <Box sx={{ width: "100%" }}>
          <Container sx={{ mt: 4, mb: 4 }} maxWidth="sm">
            <Typography sx={{ mt: 1 }} variant="h5">
              Order :
            </Typography>


            <Grid container spacing={1} sx={{ p: 1 }}>

              <Grid item xs={12}>
                <InputLabel>Order Type</InputLabel>
                <Select
                  disabled
                  fullWidth
                  value={parseInt(orderToEdit?.type)}
                >
                  <MenuItem value={1}>Dine-in</MenuItem>
                  <MenuItem value={2}>Delivery</MenuItem>
                  <MenuItem value={3}>Pickup</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="text"
                  label="Invoice Number"
                  name="invoiceNumber"
                  onChange={(e) => {
                    let { name, value } = e.target

                    setOrderToEdit((prev) => {
                      return {
                        ...prev,
                        [name]: value
                      }
                    })
                  }}
                  value={orderToEdit?.invoiceNumber}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="text"
                  label="Name"
                  name="name"
                  onChange={(e) => {
                    let { name, value } = e.target

                    setOrderToEdit((prev) => {
                      return {
                        ...prev,
                        [name]: value
                      }
                    })
                  }}
                  value={orderToEdit?.name}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="text"
                  label="Email"
                  name="email"
                  onChange={(e) => {
                    let { name, value } = e.target

                    setOrderToEdit((prev) => {
                      return {
                        ...prev,
                        [name]: value
                      }
                    })
                  }}
                  value={orderToEdit?.email}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="text"
                  label="Phone Number"
                  name="phone"
                  onChange={(e) => {
                    let { name, value } = e.target

                    setOrderToEdit((prev) => {
                      return {
                        ...prev,
                        [name]: value
                      }
                    })
                  }}
                  value={orderToEdit?.phone}
                  variant="outlined"
                />
              </Grid>

              {parseInt(orderToEdit?.type) === 1 &&
                <>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      type="text"
                      label="Waiter"
                      name="waiter"
                      onChange={(e) => {
                        let { name, value } = e.target

                        setOrderToEdit((prev) => {
                          return {
                            ...prev,
                            [name]: value
                          }
                        })
                      }}
                      value={orderToEdit?.waiter}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      type="text"
                      label="Table"
                      name="table"
                      onChange={(e) => {
                        let { name, value } = e.target

                        setOrderToEdit((prev) => {
                          return {
                            ...prev,
                            [name]: value
                          }
                        })
                      }}
                      value={orderToEdit?.table}
                      variant="outlined"
                    />
                  </Grid>
                </>
              }

              {parseInt(orderToEdit?.type) !== 1 &&
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="text"
                      label="From"
                      name="from"
                      onChange={(e) => {
                        let { name, value } = e.target

                        setOrderToEdit((prev) => {
                          return {
                            ...prev,
                            [name]: value
                          }
                        })
                      }}
                      value={orderToEdit?.from}
                      variant="outlined"
                    />
                  </Grid>
                </>
              }


              <Grid item xs={6}>
                <Select
                  fullWidth
                  value={orderToEdit?.status}
                  onChange={(e) => {
                    setOrderToEdit((prev) => {
                      return {
                        ...prev,
                        status: e.target.value
                      }
                    })
                  }}
                >
                  <MenuItem value={1}>Pending</MenuItem>
                  <MenuItem value={2}>Completed</MenuItem>
                  <MenuItem value={3}>Canceled</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="text"
                  label="Amount"
                  name="amount"
                  onChange={(e) => {
                    let { name, value } = e.target

                    setOrderToEdit((prev) => {
                      return {
                        ...prev,
                        [name]: value
                      }
                    })
                  }}
                  value={orderToEdit?.amount}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={orderToEdit?.orderDate}
                    onChange={(newValue) => {
                      setOrderToEdit((prev) => {
                        return {
                          ...prev,
                          orderDate: newValue
                        }
                      })
                    }}
                    renderInput={(params) => (
                      <TextField sx={{ marginBottom: "1rem" }} fullWidth {...params} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

            </Grid>

            <Stack sx={{ float: "right", mt: 2, mb: 2 }} direction="row" spacing={1}>

              <Button variant="outlined" color="info" onClick={handleCloseEditor} sx={{ width: "100px" }}>
                Close
              </Button>
              <Button
                color="primary"
                variant="contained"
                sx={{ width: "100px" }}
                onClick={editOrder}
              >
                Save
              </Button>
            </Stack>
          </Container>
        </Box>
      </Dialog>

      <Dialog maxWidth="lg" open={openDialog} onClose={handleCloseDialog} TransitionComponent={Transition}>
        <Box sx={{ width: "100%" }}>
          <Container sx={{ mt: 4, mb: 4 }} maxWidth="sm">
            <Typography sx={{ mt: 1 }} variant="h5">
              New Order :
            </Typography>

            <Grid container spacing={1} sx={{ p: 1 }}>

              <Grid item xs={12}>
                <InputLabel>Order Type</InputLabel>
                <Select
                  fullWidth
                  value={orderType}
                  onChange={(e) => {
                    setOrderType(e.target.value)
                    formik.setFieldValue("type", e.target.value)
                  }}
                >
                  <MenuItem value={1}>Dine-in</MenuItem>
                  <MenuItem value={2}>Delivery</MenuItem>
                  <MenuItem value={3}>Pickup</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  error={Boolean(formik.touched.invoiceNumber && formik.errors.invoiceNumber)}
                  fullWidth
                  type="text"
                  helperText={formik.touched.invoiceNumber && formik.errors.invoiceNumber}
                  label="Invoice Number"
                  name="invoiceNumber"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.invoiceNumber}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  error={Boolean(formik.touched.name && formik.errors.name)}
                  fullWidth
                  type="text"
                  helperText={formik.touched.name && formik.errors.name}
                  label="Name"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  variant="outlined"
                /> </Grid>

              <Grid item xs={6}>
                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  error={Boolean(formik.touched.phone && formik.errors.phone)}
                  fullWidth
                  helperText={formik.touched.phone && formik.errors.phone}
                  label="Phone Number"
                  name="phone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  variant="outlined"
                />
              </Grid>

              {orderType === 1 &&
                <>
                  <Grid item xs={6}>
                    <TextField
                      error={Boolean(formik.touched.waiter && formik.errors.waiter)}
                      fullWidth
                      helperText={formik.touched.waiter && formik.errors.waiter}
                      label="Waiter"
                      name="waiter"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.waiter}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      error={Boolean(formik.touched.table && formik.errors.table)}
                      fullWidth
                      helperText={formik.touched.table && formik.errors.table}
                      label="Table"
                      name="table"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.table}
                      variant="outlined"
                    />
                  </Grid>
                </>
              }

              {orderType !== 1 &&
                <>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(formik.touched.from && formik.errors.from)}
                      fullWidth
                      helperText={formik.touched.from && formik.errors.from}
                      label="From"
                      name="from"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.from}
                      variant="outlined"
                    />
                  </Grid>
                </>
              }


              <Grid item xs={6}>
                <Select
                  fullWidth
                  value={orderStatus}
                  onChange={(e) => {
                    setOrderStatus(e.target.value)
                    formik.setFieldValue("status", e.target.value)
                  }}
                >
                  <MenuItem value={1}>Pending</MenuItem>
                  <MenuItem value={2}>Completed</MenuItem>
                  <MenuItem value={3}>Canceled</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  error={Boolean(formik.touched.amount && formik.errors.amount)}
                  fullWidth
                  helperText={formik.touched.amount && formik.errors.amount}
                  label="Amount"
                  name="amount"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.amount}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={orderDate}
                    onChange={(newValue) => {
                      setOrderDate(newValue);
                      formik.setFieldValue("orderDate", newValue);
                    }}
                    renderInput={(params) => (
                      <TextField sx={{ marginBottom: "1rem" }} fullWidth {...params} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

            </Grid>

            <Stack sx={{ float: "right", mt: 2, mb: 2 }} direction="row" spacing={1}>
              <Button variant="outlined" color="info" onClick={handleCloseDialog} sx={{ width: "100px" }}>
                Close
              </Button>
              <Button
                color="primary"
                variant="contained"
                sx={{ width: "100px" }}
                onClick={formik.handleSubmit}
              >
                Save
              </Button>
            </Stack>
          </Container>
        </Box>
      </Dialog>

      <Head>
        <title>Orders List</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid item container justifyContent="space-between" sx={{ mb: 4 }}>
              <Grid item>
                <Typography variant="h4">Orders List</Typography>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <TextField
                size="small"
                value={type}
                onChange={handleChange}
                select
                label="Select Type"
                sx={{ width: "15%" }}
              >
                <MenuItem value={0}>Dine In</MenuItem>
                <MenuItem value={1}>Delivery</MenuItem>
                <MenuItem value={2}>Pickup</MenuItem>
              </TextField>
              <TextField
                size="small"
                sx={{ width: "15%", ml: 1 }}
                label="From *"
              />
              <TextField
                size="small"
                sx={{ width: "15%", ml: 1 }}
                label="To *"
              />
              <Button size="small" sx={{ ml: 1 }} variant="contained" onClick={() => { setOpenDialog(true) }}>
                Add Order
              </Button>
              <Button size="small" sx={{ ml: 1 }} variant="contained">
                Search
              </Button>
              <Button size="small" sx={{ ml: 1 }}>
                Reset
              </Button>
            </Box>
            {type === 0 ? (
              <DineInTable userId={userId} toggler={toggler} deleteOrder={deleteOrder} openEditor={openEditor} getFormattedDate={getFormattedDate} />
            ) : type === 1 ? (
              <DeliveryTable userId={userId} toggler={toggler} deleteOrder={deleteOrder} openEditor={openEditor} getFormattedDate={getFormattedDate} />
            ) : type === 2 ? (
              <PickupTable userId={userId} toggler={toggler} deleteOrder={deleteOrder} openEditor={openEditor} getFormattedDate={getFormattedDate} />
            ) : null}
          </Box>
        </Container>
      </Box>
    </>
  );
};

OrdersList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default OrdersList;
