import { Delete, Edit } from "@mui/icons-material";
import React, { useState, useEffect } from "react"
import {
  Button,
  Container,
  Grid,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Dialog,
  InputLabel,
  Stack,
  Select
} from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DatePicker } from "@mui/lab";
import { Box } from "@mui/system";
import Head from "next/head";
import { AuthGuard } from "../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios"
import { API_SERVICE } from "../../../../config";
import useSessionStorage from "../../../../hooks/useSessionStorage";

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

    axios.get(`${API_SERVICE}/get_orders_by_status/${userId}/${3}/${1}`)
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

    axios.get(`${API_SERVICE}/get_orders_by_status/${userId}/${3}/${2}`)
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

    axios.get(`${API_SERVICE}/get_orders_by_status/${userId}/${3}/${3}`)
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

const CancelList = () => {
  const userId = useSessionStorage('userId')
  let [toggler, setToggler] = useState(false)

  const [type, setType] = useState(0);

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
  let [orderToEdit, setOrderToEdit] = useState()

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
      <Dialog maxWidth="lg" open={openEditDialog} onClose={handleCloseEditor} >
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
      <Head>
        <title>Cancel Orders List</title>
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
                <Typography variant="h4">Cancel Orders List</Typography>
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
                sx={{ width: "15%", ml: 1 }}
                label="From *"
              />
              <TextField
                size="small"
                sx={{ width: "15%", ml: 1 }}
                label="To *"
              />
              <TextField
                size="small"
                value={type}
                onChange={(e) => { setType(e.target.value) }}
                select
                label="Select Type"
                sx={{ width: "15%", ml: 1 }}
              >
                <MenuItem value={0}>Dine In</MenuItem>
                <MenuItem value={1}>Delivery</MenuItem>
                <MenuItem value={2}>Pickup</MenuItem>
              </TextField>
              <Button size="small" sx={{ ml: 1 }} variant="contained">
                Search
              </Button>
              <Button size="small" sx={{ ml: 1 }}>
                Reset
              </Button>
            </Box>
            <Grid item container sx={{ mt: 2 }}>
              {type === 0 ? (
                <DineInTable userId={userId} toggler={toggler} deleteOrder={deleteOrder} openEditor={openEditor} getFormattedDate={getFormattedDate} />
              ) : type === 1 ? (
                <DeliveryTable userId={userId} toggler={toggler} deleteOrder={deleteOrder} openEditor={openEditor} getFormattedDate={getFormattedDate} />
              ) : type === 2 ? (
                <PickupTable userId={userId} toggler={toggler} deleteOrder={deleteOrder} openEditor={openEditor} getFormattedDate={getFormattedDate} />
              ) : null}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

CancelList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CancelList;
