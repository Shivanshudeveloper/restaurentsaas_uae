import React, { useState, useEffect } from "react";
import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Container,
  Dialog,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Snackbar
} from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';
import Head from "next/head";
import { AuthGuard } from "../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { API_SERVICE } from "../../../../config"
import useSessionStorage from "../../../../hooks/useSessionStorage";

const CouponsList = () => {
  const [open, setOpen] = useState(false);

  const userId = useSessionStorage('userId')
  let [toggler, setToggler] = useState(false)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const columns = [
    { label: "Sl", minWidth: 10, maxWidth: 30 },
    { label: "Coupon Code", minWidth: 50, maxWidth: 100 },
    { label: "Coupon Value", minWidth: 50, maxWidth: 100 },
    { label: "Start Date", minWidth: 50, maxWidth: 100 },
    { label: "End DAte", minWidth: 50, maxWidth: 100 },
    { label: "Actions", minWidth: 50, maxWidth: 100 },
  ];

  const createData = (ccode, cvalue, sdate, edate) => {
    return { ccode, cvalue, sdate, edate };
  };

  const rows = [
    createData("ABCD1234", "2000.00", "15-02-2022", "20-02-2022"),
    createData("ABCD1234", "2000.00", "15-02-2022", "20-02-2022"),
    createData("ABCD1234", "2000.00", "15-02-2022", "20-02-2022"),
    createData("ABCD1234", "2000.00", "15-02-2022", "20-02-2022"),
    createData("ABCD1234", "2000.00", "15-02-2022", "20-02-2022"),
    createData("ABCD1234", "2000.00", "15-02-2022", "20-02-2022"),
  ];

  const formik = useFormik({
    initialValues: {
      code: "",
      amount: "",
      start: "",
      end: "",
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Required").max(255),
      amount: Yup.string().required("Required").max(255),
      start: Yup.string().required("Required").max(255),
      end: Yup.string().required("Required").max(255)
    }),
    onSubmit: (values) => {
      if (!userId)
        return

      // console.log(values)
      axios.post(`${API_SERVICE}/add_coupon`, { ...values, userId })
        .then(res => {
          console.log(res.data)
          handleClose()

          // Reset state
          formik.handleReset()

          setToggler(!toggler)
        })
        .catch(err => {
          console.log(err)
        })
    }
  });


  let [coupons, setCoupons] = useState([])

  useEffect(() => {
    if (!userId)
      return

    axios.get(`${API_SERVICE}/get_coupons/${userId}`)
      .then((res) => {
        console.log(res.data)
        setCoupons(res.data.reverse())
      })
      .catch(err => { console.log(err) })

  }, [userId, toggler])

  // Delete a coupon
  function deleteCoupon(id) {
    axios.delete(`${API_SERVICE}/delete_coupon/${id}/${userId}`)
      .then(res => {
        console.log(res.data)
        setToggler(!toggler)
      })
      .catch(err => {
        console.log(err)
      })
  }

  let [openEditDialog, setOpenEditDialog] = useState(false)
  let [couponId, setCouponId] = useState()
  let [couponToEdit, setCouponToEdit] = useState({
    code: "",
    amount: "",
    start: "2001-01-01",
    end: "2001-01-01"
  })

  function handleCloseEditor() {
    setOpenEditDialog(false)
  }

  function openEditor(id) {
    console.log(id)
    setCouponId(id)
    setOpenEditDialog(true)
  }

  useEffect(() => {
    if (!couponId || !userId)
      return

    axios.get(`${API_SERVICE}/get_coupon_by_id/${couponId}/${userId}`)
      .then(res => {
        console.log(res.data)
        setCouponToEdit(res.data)
      })
      .catch(err => {
        console.log(err)
      })

  }, [couponId])

  function editCoupon() {
    if (!couponId || !userId)
      return

    if (!couponToEdit.code || !couponToEdit.amount || !couponToEdit.start || !couponToEdit.end) {
      setOpenSnackBar(true)
      return
    }

    axios.patch(`${API_SERVICE}/edit_coupon/${couponId}/${userId}`, { ...couponToEdit })
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

      <Head>
        <title>Coupons List</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Dialog maxWidth="lg" open={openEditDialog} onClose={handleCloseEditor} >
          <Box sx={{ py: 5, px: 3 }}>
            <Grid container direction="column" rowSpacing={2}>
              <Grid item container justifyContent="center">
                <Grid item>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="span"
                    color="primary"
                  >
                    Coupon
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <TextField
              fullWidth
              label="Coupon code"
              name="code"
              onChange={(e) => {
                let { name, value } = e.target

                setCouponToEdit((prev) => {
                  return {
                    ...prev,
                    [name]: value
                  }
                })
              }}
              value={couponToEdit?.code}
              variant="outlined"
              margin="normal"
            />

            <TextField
              fullWidth
              value={couponToEdit?.amount}
              label="Coupon Amount"
              name="amount"
              onChange={(e) => {
                let { name, value } = e.target

                setCouponToEdit((prev) => {
                  return {
                    ...prev,
                    [name]: value
                  }
                })
              }}
              margin="normal"
            />

            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                type="date"
                variant="outlined"
                name="start"
                value={couponToEdit?.start}
                onChange={(e) => {
                  let { name, value } = e.target

                  setCouponToEdit((prev) => {
                    return {
                      ...prev,
                      [name]: value
                    }
                  })
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      Start Date:{" "}
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                type="date"
                variant="outlined"
                name="end"
                value={couponToEdit?.end}
                onChange={(e) => {
                  let { name, value } = e.target

                  setCouponToEdit((prev) => {
                    return {
                      ...prev,
                      [name]: value
                    }
                  })
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">End Date: </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                mt: 4,
              }}
            >
              <Button variant="outlined" sx={{ mr: 1 }} onClick={handleCloseEditor}>
                Close
              </Button>
              <Button variant="contained" sx={{ mr: 1 }} onClick={editCoupon}>
                Save
              </Button>
            </Box>
          </Box>
        </Dialog>

        <Dialog open={open} fullWidth onClose={handleClose}>
          <Box sx={{ py: 5, px: 3 }}>
            <Grid container direction="column" rowSpacing={2}>
              <Grid item container justifyContent="center">
                <Grid item>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="span"
                    color="primary"
                  >
                    Add Coupon
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <TextField
              error={Boolean(formik.touched.code && formik.errors.code)}
              fullWidth
              helperText={formik.touched.code && formik.errors.code}
              label="Coupon code"
              name="code"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.code}
              variant="outlined"
              margin="normal"
            />

            <TextField
              error={Boolean(formik.touched.amount && formik.errors.amount)}
              fullWidth
              helperText={formik.touched.amount && formik.errors.amount}
              label="Coupon Amount"
              name="amount"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.amount}
              variant="outlined"
              margin="normal"
            />

            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                type="date"
                variant="outlined"
                name="start"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.start}
                helperText={formik.touched.start && formik.errors.start}
                error={Boolean(formik.touched.start && formik.errors.start)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      Start Date:{" "}
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                type="date"
                variant="outlined"
                name="end"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.end}
                helperText={formik.touched.end && formik.errors.end}
                error={Boolean(formik.touched.end && formik.errors.end)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">End Date: </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                mt: 4,
              }}
            >
              <Button variant="outlined" sx={{ mr: 1 }} onClick={handleClose}>
                Close
              </Button>
              <Button variant="contained" sx={{ mr: 1 }} onClick={formik.handleSubmit}>
                Add Coupon
              </Button>
            </Box>
          </Box>
        </Dialog>
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid item container justifyContent="space-between" sx={{ mb: 2 }}>
              <Grid item>
                <Typography variant="h4">Coupons List</Typography>
              </Grid>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleOpen}
              >
                Add Coupon
              </Button>
            </Grid>
            {/* <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Stack direction="row" spacing={2}>
                <Button size="small">Copy</Button>
                <Button size="small">CSV</Button>
                <Button size="small">Excel</Button>
                <Button size="small">PDF</Button>
                <Button size="small">Print</Button>
              </Stack>
              <Box>
                <TextField size="small" label="Search"></TextField>
              </Box>
            </Box> */}
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
                  {coupons.map((row, id) => (
                    <TableRow hover>
                      <TableCell align="center">{id + 1}</TableCell>
                      <TableCell align="center">{row.code}</TableCell>
                      <TableCell align="center">{row.amount}</TableCell>
                      <TableCell align="center">{row.start}</TableCell>
                      <TableCell align="center">{row.end}</TableCell>
                      <TableCell align="center">
                        <IconButton size="small" color="primary"
                          onClick={() => { openEditor(row._id) }}>
                          <Edit />
                        </IconButton>
                        <IconButton size="small" sx={{ color: "error.main" }}
                          onClick={() => { deleteCoupon(row._id) }}
                        >
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

CouponsList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CouponsList;
