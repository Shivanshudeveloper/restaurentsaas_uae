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
} from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { AuthGuard } from "../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";

const CouponsList = () => {
  const [open, setOpen] = useState(false);

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
  return (
    <>
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
              size="large"
              label="Enter Coupon Code"
              fullWidth
              sx={{ my: 1 }}
            />
            <TextField
              size="large"
              label="Enter Coupon Amount"
              fullWidth
              sx={{ my: 1 }}
            />
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                type="date"
                variant="outlined"
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
                Reset
              </Button>
              <Button variant="contained" sx={{ mr: 1 }} onClick={handleClose}>
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
            <Box
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
                  {rows.map((row, id) => (
                    <TableRow hover>
                      <TableCell align="center">{id + 1}</TableCell>
                      <TableCell align="center">{row.ccode}</TableCell>
                      <TableCell align="center">{row.cvalue}</TableCell>
                      <TableCell align="center">{row.sdate}</TableCell>
                      <TableCell align="center">{row.edate}</TableCell>
                      <TableCell align="center">
                        <IconButton size="small" color="primary">
                          <Edit />
                        </IconButton>
                        <IconButton size="small" sx={{ color: "error.main" }}>
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
