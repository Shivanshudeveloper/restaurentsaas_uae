import { useEffect, useState } from "react";
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
} from "@mui/material";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";

import { ArrowRight as ArrowRightIcon } from "../../../icons/arrow-right";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { gtm } from "../../../lib/gtm";
import { Add, BarChart, Delete, Edit } from "@mui/icons-material";
import Link from "next/link";

const DineInTable = () => {
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
            {rows.map((row, id) => (
              <TableRow hover>
                <TableCell align="center">{id + 1}</TableCell>
                <TableCell align="center">{row.invnum}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{row.wtr}</TableCell>
                <TableCell align="center">{row.tbl}</TableCell>
                <TableCell align="center">{row.stat}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.amt}</TableCell>
                <TableCell align="center">
                  <IconButton size="small" color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton size="small" sx={{ color: "error.main" }}>
                    <Delete />
                  </IconButton>
                  <IconButton size="small">
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </>
  );
};

// -----------------------------------------
const DeliveryTable = () => {
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
            {rows.map((row, id) => (
              <TableRow hover>
                <TableCell align="center">{id + 1}</TableCell>
                <TableCell align="center">{row.invnum}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{row.frm}</TableCell>
                <TableCell align="center">{row.stat}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.amt}</TableCell>
                <TableCell align="center">
                  <IconButton size="small" color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton size="small" sx={{ color: "error.main" }}>
                    <Delete />
                  </IconButton>
                  <IconButton size="small">
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </>
  );
};

// ---------------------------
// ---------------------------
const PickupTable = () => {
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
            {rows.map((row, id) => (
              <TableRow hover>
                <TableCell align="center">{id + 1}</TableCell>
                <TableCell align="center">{row.invnum}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{row.frm}</TableCell>
                <TableCell align="center">{row.stat}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.amt}</TableCell>
                <TableCell align="center">
                  <IconButton size="small" color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton size="small" sx={{ color: "error.main" }}>
                    <Delete />
                  </IconButton>
                  <IconButton size="small">
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </>
  );
};
const OrdersList = () => {
  const [type, setType] = useState(0);
  const handleChange = (event) => {
    setType(event.target.value);
    console.log(type);
  };
  return (
    <>
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

              <Button size="small" sx={{ ml: 1 }} variant="contained">
                Search
              </Button>
              <Button size="small" sx={{ ml: 1 }}>
                Reset
              </Button>
            </Box>
            {type === 0 ? (
              <DineInTable />
            ) : type === 1 ? (
              <DeliveryTable />
            ) : type === 2 ? (
              <PickupTable />
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
