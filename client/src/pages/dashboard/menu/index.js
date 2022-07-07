import React, { useCallback, useEffect, useRef, useState } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Grid,
  Container,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableContainer,
  TableRow,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import TableHead from "@mui/material/TableHead";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import { Plus as PlusIcon } from "../../../icons/plus";
import Paper from "@mui/material/Paper";
import { IconButton, Tooltip, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DatePicker, TimePicker } from "@mui/lab";
import Chip from "@mui/material/Chip";
import axios from "axios";
import { API_SERVICE } from "../../../config";
import useSessionStorage from "../../../hooks/useSessionStorage";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };

const Menu = () => {
  // For add reservation dialog box
  let [addReservationModal, setAddReservationModal] = useState(false);

  function closeAddReservationModal() {
    setAddReservationModal(false);
  }

  // States for adding a new reservation
  const userId = useSessionStorage("userId");
  let [toggler, setToggler] = useState(false);

  function getFormattedDate(date) {
    date = new Date(date);
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return day + "/" + month + "/" + year;
  }

  const [categoryname, setcategoryname] = React.useState("");
  const [itemname, setitemname] = React.useState("");
  const [price, setprice] = React.useState("");
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const [allcategories, setallcategories] = React.useState([]);
  const [menuItems, setMenuItems] = React.useState([]);

  useEffect(() => {
    axios
      .get(`${API_SERVICE}/getcategorydata`)
      .then((res) => {
        setallcategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`${API_SERVICE}/getallitems/${userId}`)
      .then((res) => {
        setMenuItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId, toggler]);

  useEffect(() => {
    console.log("item", itemId);
    if (itemId == null) {
      setitemname("");
      setcategoryname("");
      setprice("");
      setChecked(true);
    }
  }, [itemId]);

  const [itemId, setItemId] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  function openAddReservationModal(id) {
    console.log(id);
    setItemId(id);
    setIsEditing(true);
    console.log(menuItems.find((item) => item._id == id));
    var item = menuItems.find((item) => item._id == id);
    if (item) {
      setitemname(item.itemname);
      setcategoryname(item.categoryname);
      setprice(item.price);
      setChecked(item.stock);
    }
    setAddReservationModal(true);
  }

  function addItem() {
    if (!userId) return;
    var uploadData = {
      itemname,
      categoryname,
      price,
      stock: checked,
      userId: userId,
    };
    axios
      .post(`${API_SERVICE}/addmenuitem`, uploadData)
      .then((response) => {
        if (response.status === 200) {
          alert("Item Added");
          closeAddReservationModal();
          setToggler(!toggler);
        }
      })
      .catch((err) => console.log(err));
  }

  function editItem() {
    if (!itemId || !userId) return;

    // Check if the input fields are vacant if so then display an error message
    if (!itemname || !categoryname || !price) {
      return;
    }

    var uploadData = {
      itemname,
      categoryname,
      price,
      stock: checked,
      userId,
    };

    axios
      .patch(`${API_SERVICE}/edit_menuitem/${itemId}/${userId}`, uploadData)
      .then((res) => {
        console.log(res.data);
        closeAddReservationModal();
        setToggler(!toggler);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteItem(id) {
    if (!id || !userId) return;
    axios
      .delete(`${API_SERVICE}/delete_menuitem/${id}/${userId}`)
      .then((res) => {
        console.log(res.data);
        setToggler(!toggler);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Dialog
        open={addReservationModal}
        onClose={closeAddReservationModal}
        aria-labelledby="alert-dialog-title"
        fullWidth
        maxWidth="sm"
        aria-describedby="alert-dialog-description"
      >
        <div className="container">
          <DialogTitle id="alert-dialog-title" sx={{ float: "left" }}>
            Menu :
          </DialogTitle>
          <DialogActions>
            <Button color="error" onClick={closeAddReservationModal}>
              <CloseIcon />
            </Button>
          </DialogActions>
        </div>

        <DialogContent>
          <TextField
            fullWidth
            value={itemname}
            onChange={(e) => setitemname(e.target.value)}
            sx={{ mb: 2 }}
            variant="outlined"
            label="Item Name"
          />
          <select
            style={{
              width: "100%",
              padding: "17px",
              fontSize: "16px",
              borderRadius: "10px",
            }}
            name="timezone_offset"
            id="timezone-offset"
            onChange={(e) => setcategoryname(e.target.value)}
          >
            <option selected disabled>
              Select Category
            </option>
            {allcategories.map((category) => {
              return (
                <option value={category.categoryname}>
                  {category.categoryname}
                </option>
              );
            })}
          </select>

          <TextField
            fullWidth
            value={price}
            onChange={(e) => setprice(e.target.value)}
            sx={{ mt: 2 }}
            variant="outlined"
            label="Price"
          />

          <div
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          ></div>

          <FormGroup
            style={{ margin: "20px auto" }}
            component="fieldset"
            variant="standard"
          >
            <FormControlLabel
              control={
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  color="primary"
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label={checked ? "In stock" : "Not in stock"}
            />
          </FormGroup>
        </DialogContent>

        <DialogActions>
          <Button color="error" onClick={closeAddReservationModal} autoFocus>
            Close
          </Button>
          {isEditing ? (
            <Button autoFocus onClick={editItem}>
              Edit
            </Button>
          ) : (
            <Button autoFocus onClick={addItem}>
              Submit
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Head>
        <title>Add Item</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container justifyContent="space-between" spacing={3}>
            <Grid item>
              <Typography variant="h4">Menu</Typography>
            </Grid>
            <Grid item>
              <Button
                startIcon={<PlusIcon fontSize="small" />}
                variant="contained"
                onClick={() => {
                  setItemId(null);
                  setIsEditing(false);
                  setAddReservationModal(true);
                }}
              >
                Add
              </Button>
            </Grid>
          </Grid>
          <TableContainer component={Paper} sx={{ m: 1 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">S.No </TableCell>
                  <TableCell align="center">Item Name</TableCell>
                  <TableCell align="center">Category</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Stock</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {menuItems.map((row, i) => {
                  return (
                    <TableRow hover key={row._id} sx={{ cursor: "pointer" }}>
                      <TableCell align="center">{i + 1}</TableCell>
                      <TableCell align="center">{row.itemname}</TableCell>

                      <TableCell align="center">{row.categoryname}</TableCell>

                      <TableCell align="center">{row.price} USD</TableCell>

                      <TableCell align="center">
                        {row.stock ? "In stock" : "Not in stock"}
                      </TableCell>

                      <TableCell align="center">
                        <Tooltip title="Edit">
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => {
                              openAddReservationModal(row._id);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            onClick={() => {
                              console.log(row._id);
                              deleteItem(row._id);
                            }}
                            color="error"
                            aria-label="upload picture"
                            component="span"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </>
  );
};

Menu.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Menu;
