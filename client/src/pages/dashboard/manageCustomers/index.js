import React, { useState, useEffect } from "react"
import { Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Container,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Dialog,
  Select,
  InputLabel,
  Snackbar
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Box } from "@mui/system";
import Head from "next/head";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useSessionStorage from "../../../hooks/useSessionStorage";
import axios from "axios"
import { API_SERVICE } from "../../../config";


import { useFormik } from "formik";
import * as Yup from "yup"

const CustomersList = () => {
  const columns = [
    { label: "Sl", minWidth: 10, maxWidth: 30 },
    { label: "Title", minWidth: 50, maxWidth: 100 },
    { label: "Name", minWidth: 50, maxWidth: 100 },
    { label: "Rating", minWidth: 50, maxWidth: 100 },
    { label: "Email Address", minWidth: 50, maxWidth: 100 },
    { label: "Actions", minWidth: 50, maxWidth: 100 },
  ];

  const createData = (title, name, rev, rating, email) => {
    return { title, name, rev, rating, email };
  };

  const rows = [
    createData("dummy", "Dummy", "Very Good", "5.00", "email@gmail.com"),
    createData("dummy", "Dummy", "Very Good", "5.00", "email@gmail.com"),
    createData("dummy", "Dummy", "Very Good", "5.00", "email@gmail.com"),
    createData("dummy", "Dummy", "Very Good", "5.00", "email@gmail.com"),
    createData("dummy", "Dummy", "Very Good", "5.00", "email@gmail.com"),
    createData("dummy", "Dummy", "Very Good", "5.00", "email@gmail.com"),
    createData("dummy", "Dummy", "Very Good", "5.00", "email@gmail.com"),
    createData("dummy", "Dummy", "Very Good", "5.00", "email@gmail.com"),
  ];

  let [openDialog, setOpenDialog] = useState(false)

  function handleCloseDialog() {
    setOpenDialog(false)
  }

  // State
  const userId = useSessionStorage('userId')
  let [toggler, setToggler] = useState(false)

  const formik = useFormik({
    initialValues: {
      title: "",
      name: "",
      rating: "",
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      title: Yup.string().required("Required").max(255),
      name: Yup.string().required("Required").max(255),
      rating: Yup.string().required("Required").max(255)
    }),
    onSubmit: (values) => {
      if (!userId)
        return

      axios.post(`${API_SERVICE}/add_customer`, { ...values, userId })
        .then(res => {
          console.log(res.data)
          handleCloseDialog()

          // Reset state
          formik.handleReset()

          setToggler(!toggler)
        })
        .catch(err => {
          console.log(err)
        })
    }
  });

  let [customers, setCustomers] = useState([])

  useEffect(() => {
    if (!userId)
      return

    axios.get(`${API_SERVICE}/get_customers/${userId}`)
      .then(res => {
        console.log(res.data)
        setCustomers(res.data.reverse())
      })
      .catch(err => {
        console.log(err)
      })
  }, [userId, toggler])

  function deleteCustomer(id) {
    axios.delete(`${API_SERVICE}/delete_customer/${id}/${userId}`)
      .then(res => {
        console.log(res.data)
        setToggler(!toggler)
      })
      .catch(err => {
        console.log(err)
      })
  }

  let [openEditDialog, setOpenEditDialog] = useState(false)
  let [customerId, setCustomerId] = useState()
  let [customerToEdit, setCustomerToEdit] = useState({
    title: "",
    name: "",
    rating: "",
    email: "",
  })

  function handleCloseEditor() {
    setOpenEditDialog(false)
  }

  function openEditor(id) {
    console.log(id)
    setCustomerId(id)
    setOpenEditDialog(true)
  }

  useEffect(() => {
    if (!customerId || !userId)
      return

    axios.get(`${API_SERVICE}/get_customer_by_id/${customerId}/${userId}`)
      .then(res => {
        console.log(res.data)
        setCustomerToEdit(res.data)
      })
      .catch(err => {
        console.log(err)
      })

  }, [customerId])

  function editCustomer() {
    if (!customerId || !userId)
      return

    if (!customerToEdit.title || !customerToEdit.name || !customerToEdit.rating || !customerToEdit.email) {
      setOpenSnackBar(true)
      return
    }

    axios.patch(`${API_SERVICE}/edit_customer/${customerId}/${userId}`, { ...customerToEdit })
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
  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackBar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );


  return (
    <>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        message="Input(s) vacant"
        action={action}
      />

      <Dialog maxWidth="lg" open={openEditDialog} onClose={handleCloseEditor} >
        <Box sx={{ width: "100%" }}>
          <Container sx={{ mt: 4, mb: 4 }} maxWidth="sm">
            <Typography sx={{ mt: 1, mb: 0.5 }} variant="h5">
              Customer :
            </Typography>

            <Grid container spacing={1} sx={{ p: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  variant="outlined"
                  value={customerToEdit?.title}
                  name="title"
                  onChange={(e) => {
                    setCustomerToEdit(prev => {
                      let { name, value } = e.target

                      return {
                        ...prev,
                        [name]: value
                      }
                    })
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  value={customerToEdit?.email}
                  name="email"
                  onChange={(e) => {
                    setCustomerToEdit(prev => {
                      let { name, value } = e.target

                      return {
                        ...prev,
                        [name]: value
                      }
                    })
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  value={customerToEdit?.name}
                  name="name"
                  onChange={(e) => {
                    setCustomerToEdit(prev => {
                      let { name, value } = e.target

                      return {
                        ...prev,
                        [name]: value
                      }
                    })
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Rating"
                  variant="outlined"
                  value={customerToEdit?.rating}
                  name="rating"
                  onChange={(e) => {
                    setCustomerToEdit(prev => {
                      let { name, value } = e.target

                      return {
                        ...prev,
                        [name]: value
                      }
                    })
                  }}
                />
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
                onClick={editCustomer}
              >
                Save
              </Button>
            </Stack>
          </Container>
        </Box>
      </Dialog>

      <Dialog maxWidth="lg" open={openDialog} onClose={handleCloseDialog} >
        <Box sx={{ width: "100%" }}>
          <Container sx={{ mt: 4, mb: 4 }} maxWidth="sm">
            <Typography sx={{ mt: 1, mb: 0.5 }} variant="h5">
              New Customer :
            </Typography>

            <Grid container spacing={1} sx={{ p: 1 }}>
              <Grid item xs={12}>
                <TextField
                  error={Boolean(formik.touched.title && formik.errors.title)}
                  fullWidth
                  helperText={formik.touched.title && formik.errors.title}
                  label="Title"
                  name="title"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
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

              <Grid item xs={12}>
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
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  error={Boolean(formik.touched.rating && formik.errors.rating)}
                  fullWidth
                  helperText={formik.touched.rating && formik.errors.rating}
                  label="Rating"
                  name="rating"
                  type="number"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.rating}
                  variant="outlined"
                />
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
        <title>Customers List</title>
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
                <Typography variant="h4">Customers</Typography>
              </Grid>
            </Grid>

            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <Stack direction="row" spacing={2}>
                {/* <Button size="small">Copy</Button>
                <Button size="small">CSV</Button>
                <Button size="small">Excel</Button>
                <Button size="small">PDF</Button>
                <Button size="small">Print</Button> */}

                <Button sx={{ mr: 1 }} onClick={() => { setOpenDialog(true) }} variant="contained">Add Customer</Button>
              </Stack>
              <Box>
                <TextField size="small" label="Search"></TextField>
              </Box>
            </Box>
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
                  {customers.map((row, id) => (
                    <TableRow hover>
                      <TableCell align="center">{id + 1}</TableCell>
                      <TableCell align="center">{row.title}</TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.rating}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">
                        <IconButton size="small" color="primary" onClick={() => { openEditor(row._id) }}>
                          <Edit />
                        </IconButton>
                        <IconButton size="small" sx={{ color: "error.main" }}
                          onClick={() => { deleteCustomer(row._id) }}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

CustomersList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CustomersList;
