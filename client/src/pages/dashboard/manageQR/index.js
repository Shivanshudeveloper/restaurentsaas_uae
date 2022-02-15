import React, { useEffect, useState } from "react";
import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import QRDummy1 from "../../../assets/qrDummy1.png";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const QRTable = ({ columns, rows }) => {
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
                <TableCell align="center">
                  <img src={row.img}></img>
                </TableCell>
                <TableCell align="center">{row.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </>
  );
};

const QRList = () => {
  const [type, setType] = useState();
  const handleChangeQRForm = (event) => {
    setType(event.target.value);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { label: "Sl", minWidth: 10, maxWidth: 30 },
    { label: "QR Code", minWidth: 50, maxWidth: 100 },
    { label: "Details", minWidth: 50, maxWidth: 100 },
  ];

  const createData = (img, details) => {
    return { img, details };
  };

  const rowsDineIn = [
    createData("src/assets/qrDummy1.png", "Details and Data and Time"),
    createData("src/assets/qrDummy1.png", "Details and Data and Time"),
    createData("src/assets/qrDummy1.png", "Details and Data and Time"),
    createData("src/assets/qrDummy1.png", "Details and Data and Time"),
  ];

  const rowsDelivery = [
    createData("src/assets/qrDummy2.png", "Details and Data and Time"),
    createData("src/assets/qrDummy2.png", "Details and Data and Time"),
    createData("src/assets/qrDummy2.png", "Details and Data and Time"),
    createData("src/assets/qrDummy2.png", "Details and Data and Time"),
    createData("src/assets/qrDummy2.png", "Details and Data and Time"),
    createData("src/assets/qrDummy2.png", "Details and Data and Time"),
    createData("src/assets/qrDummy2.png", "Details and Data and Time"),
  ];

  const rowsPickUp = [
    createData("src/assets/qrDummy3.png", "Details and Data and Time"),
    createData("src/assets/qrDummy3.png", "Details and Data and Time"),
  ];
  return (
    <>
      <Head>
        <title>QR Codes List</title>
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
                    Add QR
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <TextField
              value={type}
              select
              size="large"
              label="Type"
              fullWidth
              sx={{ my: 1 }}
              onChange={handleChangeQRForm}
            >
              <MenuItem value="Dine In">Dine In</MenuItem>
              <MenuItem value="Delivery">Delivery</MenuItem>
              <MenuItem value="Pick-Up">Pick-Up</MenuItem>
            </TextField>
            {type === "Dine In" ? (
              <TextField
                size="large"
                label="Table Number"
                fullWidth
                sx={{ my: 1 }}
              />
            ) : null}
            <TextField
              size="large"
              label="Restaurant Name"
              fullWidth
              sx={{ my: 1 }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                mt: 1,
              }}
            >
              <Button variant="outlined" sx={{ mr: 1 }} onClick={handleClose}>
                Reset
              </Button>
              <Button variant="contained" sx={{ mr: 1 }} onClick={handleClose}>
                Save Form
              </Button>
            </Box>
          </Box>
        </Dialog>
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid
              item
              container
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Grid item>
                <Typography variant="h4">QR Codes</Typography>
              </Grid>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleOpen}
              >
                Add QR
              </Button>
            </Grid>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Dine In" {...a11yProps(0)} />
                <Tab label="Delivery" {...a11yProps(1)} />
                <Tab label="Pick-Up" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <QRTable columns={columns} rows={rowsDineIn} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <QRTable columns={columns} rows={rowsDelivery} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <QRTable columns={columns} rows={rowsPickUp} />
            </TabPanel>
          </Box>
        </Container>
      </Box>
    </>
  );
};

QRList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default QRList;
