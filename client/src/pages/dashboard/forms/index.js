import React, { useEffect } from "react";
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
  Snackbar,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import { Clipboard as ClipboardIcon } from "../../../icons/clipboard";
import { BASE_URL } from "../../../config";
import { useAuth } from "../../../hooks/use-auth";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { API_SERVICE } from "../../../config";

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
  const [feedbacks, setFeedbacks] = React.useState([]);
  const [toggler, setToggler] = React.useState(false);

  const { user } = useAuth();

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const copyToClipboard = (content) => {
    const el = document.createElement("textarea");
    el.value = content;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  const [snackOpen, setSnackOpen] = React.useState(false);

  const handleClick = () => {
    setSnackOpen(true);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
    setNext(false);
  };

  const handleClose = () => setOpen(false);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function deleteFeedback(feedbackId) {
    if (!user?.id) return;
    axios
      .delete(`${API_SERVICE}/delete_feedback/${feedbackId}/${user.id}`)
      .then((res) => {
        console.log(res.data);
        setToggler(!toggler);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (!user?.id) return;
    axios
      .get(`${API_SERVICE}/get_feedbacks/${user.id}`)
      .then((res) => {
        console.log("Fetched Templates");
        console.log(res.data);
        setFeedbacks(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user?.id, toggler]);

  const columns = [
    { label: "Sr", minWidth: 10, maxWidth: 30 },
    // { label: "First Name", minWidth: 50, maxWidth: 100 },
    // { label: "Last Name", minWidth: 50, maxWidth: 100 },
    // { label: "Phone Number", minWidth: 50, maxWidth: 100 },

    { label: "Rating", minWidth: 50, maxWidth: 100 },
    { label: "Comment", minWidth: 50, maxWidth: 100 },
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
        <Snackbar
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={snackOpen}
          onClose={handleSnackClose}
        >
          <Alert onClose={handleSnackClose} severity="success">
            "Text Copied to Clipboard"
          </Alert>
        </Snackbar>
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
              style={{ margin: "0 20px" }}
              startIcon={<ClipboardIcon fontSize="small" />}
              variant="contained"
              onClick={() => {
                console.log(BASE_URL);
                copyToClipboard(
                  `${BASE_URL}/dashboard/forms/feedback/${user.id}`
                );
                handleClick();
              }}
            >
              Copy
            </Button>
            <Button
              variant="contained"
              startIcon={<Add />}
              href="/dashboard/forms/scanQR"
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
                  <TableCell key={id} align="center">
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {feedbacks.map((row, index) => (
                <TableRow key={row._id} hover sx={{}}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">
                    <Rating
                      defaultValue={row.rating}
                      precision={0.5}
                      readOnly
                    />
                  </TableCell>
                  <TableCell align="center">{row.message}</TableCell>
                  <TableCell align="center">{row.date}</TableCell>
                  <TableCell align="center">
                    {/* <IconButton size="small" color="primary">
                      <Edit />
                    </IconButton> */}
                    <IconButton
                      onClick={() => deleteFeedback(row._id)}
                      size="small"
                      sx={{ color: "error.main" }}
                    >
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
