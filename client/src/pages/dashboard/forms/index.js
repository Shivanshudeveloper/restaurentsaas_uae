import React from "react";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import {
  Grid,
  Button,
  IconButton,
  Modal,
  Backdrop,
  Fade,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Box,
  Tabs,
  Tab,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  AppBar,
  Toolbar,
  Divider,
  Rating,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 2,
  display: "flex",
  flexGrow: 1,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pl: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Repair = (props) => {
  const [open, setOpen] = React.useState(false);
  const [next, setNext] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    setNext(false);
  };
  const handleClose = () => setOpen(false);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const columns = [
    { label: "Sr", minWidth: 10, maxWidth: 30 },
    { label: "First Name", minWidth: 50, maxWidth: 100 },
    { label: "Last Name", minWidth: 50, maxWidth: 100 },
    { label: "Phone Number", minWidth: 50, maxWidth: 100 },
    { label: "Rating", minWidth: 50, maxWidth: 100 },
    { label: "Date", minWidth: 50, maxWidth: 100 },
    { label: "Actions", minWidth: 50, maxWidth: 100 },
  ];

  const createData = (name, lname, num, rating, date) => {
    return { name, lname, num, rating, date };
  };

  const rows = [
    createData("Suresh", "Sharma", "999998888", "5", "12-02-2022"),
    createData("Suresh", "Sharma", "999998888", "4.5", "12-02-2022"),
    createData("Suresh", "Sharma", "999998888", "4", "12-02-2022"),
    createData("Suresh", "Sharma", "999998888", "5", "12-02-2022"),
    createData("Suresh", "Sharma", "999998888", "3.5", "12-02-2022"),
    createData("Suresh", "Sharma", "999998888", "4", "12-02-2022"),
  ];

  return (
    <>
      <Grid container sx={{ p: 2, py: "64px" }} direction="column">
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
                    Add A Form
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <TextField
              size="large"
              label="Form Title"
              fullWidth
              sx={{ my: 1, mt: 2 }}
            />
            <Divider variant="middle" sx={{ my: 2 }} />
            <TextField
              select
              size="large"
              label="Type"
              fullWidth
              sx={{ my: 1 }}
            >
              <MenuItem value="Text Field">Text Field</MenuItem>
              <MenuItem value="Text Area">Text Area</MenuItem>
              <MenuItem value="Email ID 3">Email ID</MenuItem>
              <MenuItem value="Password">Password</MenuItem>
              <MenuItem value="Checkbox">Checkbox</MenuItem>
              <MenuItem value="Combo Box">Combo Box</MenuItem>
            </TextField>
            <TextField size="large" label="Name" fullWidth sx={{ my: 1 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                mt: 1,
              }}
            >
              <Button variant="outlined" sx={{ mr: 1, width: "100%" }}>
                Add
              </Button>
            </Box>
            <Divider variant="fullWidth" sx={{ my: 3, mb: 4 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                mt: 1,
              }}
            >
              <Button variant="outlined" sx={{ mr: 1 }} onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" sx={{ mr: 1 }} onClick={handleClose}>
                Save Form
              </Button>
            </Box>
          </Box>
        </Dialog>
        <Grid
          item
          container
          justifyContent="space-between"
          sx={{ mb: 2, px: "24px" }}
        >
          <Grid item>
            <Typography variant="h4">Forms</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              startIcon={<Add />}
              href="/dashboard/forms/feedback"
            >
              Add Feedback Form
            </Button>
          </Grid>
        </Grid>
        <Grid item container sx={{}}>
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
                <TableRow hover sx={{}}>
                  <TableCell align="center">{id + 1}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.lname}</TableCell>
                  <TableCell align="center">{row.num}</TableCell>
                  <TableCell align="center">
                    <Rating
                      defaultValue={row.rating}
                      precision={0.5}
                      readOnly
                    />
                  </TableCell>
                  <TableCell align="center">{row.date}</TableCell>
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
      </Grid>
    </>
  );
};

Repair.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Repair;
