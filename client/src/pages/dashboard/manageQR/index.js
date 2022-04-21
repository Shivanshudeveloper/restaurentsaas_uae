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
var QRCode = require('qrcode.react');
import axios from "axios"
import { API_SERVICE } from "../../../config";
import useSessionStorage from "../../../hooks/useSessionStorage"
import { setDate } from "date-fns";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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

const QRTable = ({ columns, type, userId, toggler, setToggler }) => {

  let [data, setData] = useState([])

  useEffect(() => {
    if (!userId)
      return

    axios.get(`${API_SERVICE}/get_qr_code/${type}/${userId}`)
      .then(res => {
        console.log(res.data)
        setData(res.data.reverse())
      })
      .catch(err => { console.log(err) })

  }, [userId, toggler])

  let [QRId, setQRId] = useState()
  let [QRCodeToEdit, setQRCode] = useState({
    type: "",
    name: "",
    table: ""
  })

  useEffect(() => {
    if (!QRId || !userId)
      return

    axios.get(`${API_SERVICE}/get_code_by_id/${QRId}/${userId}`)
      .then(res => {
        setQRCode(res.data)
      })
      .catch(err => {
        console.log(err)
      })

  }, [QRId])

  function editQRCode() {

    axios.patch(`${API_SERVICE}/edit_qr_code/${QRId}/${userId}`, {
      ...QRCodeToEdit
    })
      .then(res => {
        console.log(res)
        setToggler(!toggler)
        handleClose()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
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
                  QR code :
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <TextField
            select
            size="large"
            label="Type"
            fullWidth
            sx={{ my: 1 }}
            value={QRCodeToEdit?.type}
            name="type"
            onChange={(e) => {
              let { name, value } = e.target

              setQRCode((prev) => {
                return {
                  ...prev,
                  [name]: value
                }
              })
            }}
          >
            <MenuItem value="Dine In">Dine In</MenuItem>
            <MenuItem value="Delivery">Delivery</MenuItem>
            <MenuItem value="Pick-Up">Pick-Up</MenuItem>
          </TextField>
          {QRCodeToEdit?.type === "Dine In" ? (
            <TextField
              size="large"
              label="Table Number"
              fullWidth
              sx={{ my: 1 }}
              value={QRCodeToEdit?.table}
              name="table"
              onChange={(e) => {
                let { name, value } = e.target

                setQRCode((prev) => {
                  return {
                    ...prev,
                    [name]: value
                  }
                })
              }}
            />
          ) : null}
          <TextField
            size="large"
            label="Restaurant Name"
            fullWidth
            sx={{ my: 1 }}
            value={QRCodeToEdit?.name}
            name="name"
            onChange={(e) => {
              let { name, value } = e.target

              setQRCode((prev) => {
                return {
                  ...prev,
                  [name]: value
                }
              })
            }}
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
              Close
            </Button>
            <Button variant="contained" sx={{ mr: 1 }} onClick={editQRCode}>
              Save Form
            </Button>
          </Box>
        </Box>
      </Dialog>

      <Grid item container sx={{ mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((column, i) => (
                <TableCell key={i} align="center">{column.label}</TableCell>
              ))}

              {type === "Dine In" && <TableCell align="center">Table</TableCell>}

              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {data?.map((row, id) => {

              return <TableRow hover key={row._id}>
                <TableCell align="center">{id + 1}</TableCell>

                <TableCell align="center"
                  onClick={() => {
                    window.open(`http://demo?type=${type}&name=${row.name}`)
                  }}
                >
                  <QRCode value={`http://demo?type=${type}&name=${row.name}`} style={{ width: "50px", height: "50px" }} />
                </TableCell>

                <TableCell align="center">{row.name}</TableCell>


                {type === "Dine In" && <TableCell align="center">{row.table}</TableCell>}

                <TableCell align="center">

                  <IconButton onClick={() => {
                    axios.delete(`${API_SERVICE}/delete_qr_code/${row._id}/${userId}`)
                    setToggler(!toggler)
                  }}
                    color="error"
                    style={{ marginRight: "0.5rem" }}
                  >
                    <DeleteIcon></DeleteIcon>
                  </IconButton>

                  <IconButton onClick={() => {
                    setQRId(row._id)
                    handleOpen()
                  }}
                    color="success"
                  >
                    <EditIcon></EditIcon>
                  </IconButton>

                </TableCell>

              </TableRow>
            }
            )}

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
    setNewQRCode({
      type: "Dine In",
      name: "",
      table: ""
    })
  };

  const columns = [
    { label: "Sl", minWidth: 10, maxWidth: 30 },
    { label: "QR Code", minWidth: 50, maxWidth: 100 },
    { label: "Details", minWidth: 50, maxWidth: 100 },
  ];

  const createData = (img, details) => {
    return { img, details };
  }

  let [toggler, setToggler] = useState(false)
  let userId = useSessionStorage("userId")

  useEffect(() => {

    if (!userId)
      return


  }, [userId, toggler])

  let [newQRCode, setNewQRCode] = useState({
    type: "Dine In",
    name: "",
    table: ""
  })

  function saveNewQRCode() {

    if (!newQRCode.type || !newQRCode.name)
      return

    if (newQRCode.type == "Dine In" && !newQRCode.table)
      return

    axios.post(`${API_SERVICE}/add_qr_code`, {
      ...newQRCode,
      userId
    })
      .then(res => {
        console.log(res.data)
        setToggler(!toggler)
        handleClose()
      })
      .catch(err => {
        console.log(err)
      })

  }

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
              select
              size="large"
              label="Type"
              fullWidth
              sx={{ my: 1 }}
              value={newQRCode.type}
              name="type"
              onChange={(e) => {
                let { name, value } = e.target

                setNewQRCode((prev) => {
                  return {
                    ...prev,
                    [name]: value
                  }
                })
              }}
            >
              <MenuItem value="Dine In">Dine In</MenuItem>
              <MenuItem value="Delivery">Delivery</MenuItem>
              <MenuItem value="Pick-Up">Pick-Up</MenuItem>
            </TextField>
            {newQRCode.type === "Dine In" ? (
              <TextField
                size="large"
                label="Table Number"
                fullWidth
                sx={{ my: 1 }}
                value={newQRCode.table}
                name="table"
                onChange={(e) => {
                  let { name, value } = e.target

                  setNewQRCode((prev) => {
                    return {
                      ...prev,
                      [name]: value
                    }
                  })
                }}
              />
            ) : null}
            <TextField
              size="large"
              label="Restaurant Name"
              fullWidth
              sx={{ my: 1 }}
              value={newQRCode.name}
              name="name"
              onChange={(e) => {
                let { name, value } = e.target

                setNewQRCode((prev) => {
                  return {
                    ...prev,
                    [name]: value
                  }
                })
              }}
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
              <Button variant="contained" sx={{ mr: 1 }} onClick={saveNewQRCode}>
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
              <QRTable columns={columns} type="Dine In" userId={userId} toggler={toggler} setToggler={setToggler} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <QRTable columns={columns} type="Delivery" userId={userId} toggler={toggler} setToggler={setToggler} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <QRTable columns={columns} type="Pick-Up" userId={userId} toggler={toggler} setToggler={setToggler} />
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
