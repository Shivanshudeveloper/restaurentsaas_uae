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
} from "@mui/material";
import TableHead from "@mui/material/TableHead";
import { AuthGuard } from "../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout";
import { Plus as PlusIcon } from "../../../../icons/plus";
import Paper from "@mui/material/Paper";
import { IconButton, Tooltip, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DatePicker, TimePicker } from "@mui/lab";
import Chip from "@mui/material/Chip";
import useSessionStorage from "../../../../hooks/useSessionStorage";
import axios from "axios";
import { API_SERVICE } from "../../../../config";

var messages = [
  {
    id: "23232",
    title: "Title 1",
    subject: "XYZ",
    body: "The xyz component is not displaying properly. Please check the component and refactor it",
  },
  {
    id: "232338",
    title: "Title 2",
    subject: "ABC",
    body: "The xyz component is not displaying properly. Please check the component and refactor it",
  },
  {
    id: "343848",
    title: "Title 3",
    subject: "AOT",
    body: "The xyz component is not displaying properly. Please check the component and refactor it",
  },
];

const Templates = () => {
  // For add reservation dialog box
  const userId = useSessionStorage("userId");
  const [toggler, setToggler] = useState(false);
  let [addTemplateModal, setAddTemplateModal] = useState(false);
  const [messageId, setMessageId] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [filteredTemplates, setFilteredTemplates] = useState([]);

  // State(s) for adding a new message template

  let [messageToEdit, setMessageToEdit] = useState({
    title: "",
    subject: "",
    body: "",
  });

  function closeAddTemplateModal() {
    setAddTemplateModal(false);
  }

  function openAddTemplateModal(id) {
    console.log(id);
    setMessageId(id);
    setIsEditing(true);
    setAddTemplateModal(true);
  }

  function addNewTemplate() {
    if (!userId) return;
    console.log(messageToEdit);
    axios
      .post(`${API_SERVICE}/add_template`, { ...messageToEdit, userId })
      .then((res) => {
        console.log(res.data);
        closeAddTemplateModal();
        setToggler(!toggler);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function editTemplate() {
    console.log(messageToEdit);
    if (!messageId || !userId) return;

    // Check if the input fields are vacant if so then display an error message
    if (!messageToEdit.title || !messageToEdit.subject || !messageToEdit.body) {
      return;
    }

    axios
      .patch(`${API_SERVICE}/edit_template/${messageId}/${userId}`, {
        ...messageToEdit,
      })
      .then((res) => {
        console.log(res.data);
        closeAddTemplateModal();
        setToggler(!toggler);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //   function editOrder() {
  //     if (!orderId || !userId) return;

  //     // Check if the input fields are vacant if so then display an error message
  //     if (
  //       !orderToEdit.name ||
  //       !orderToEdit.invoiceNumber ||
  //       !orderToEdit.phone ||
  //       !orderToEdit.email ||
  //       !orderToEdit.amount ||
  //       !orderToEdit.status ||
  //       (parseInt(orderToEdit.type) === 1 &&
  //         (!orderToEdit.waiter || !orderToEdit.table)) ||
  //       (parseInt(orderToEdit.type) !== 1 && !orderToEdit.from)
  //     ) {
  //       setOpen(true);
  //       return;
  //     }

  //     axios
  //       .patch(`${API_SERVICE}/edit_order/${orderId}/${userId}`, {
  //         ...orderToEdit,
  //       })
  //       .then((res) => {
  //         console.log(res.data);
  //         handleCloseEditor();
  //         setToggler(!toggler);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }

  function deleteTemplate(msgId) {
    axios
      .delete(`${API_SERVICE}/delete_template/${msgId}/${userId}`)
      .then((res) => {
        console.log(res.data);
        setToggler(!toggler);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`${API_SERVICE}/get_templates/${userId}`)
      .then((res) => {
        console.log("Fetched Templates");
        console.log(res.data);
        setFilteredTemplates(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId, toggler]);

  useEffect(() => {
    if (messageId == null) {
      setMessageToEdit({});
      return;
    }

    console.log(filteredTemplates.find((message) => message._id == messageId));
    setMessageToEdit(
      filteredTemplates.find((message) => message._id == messageId)
    );
  }, [messageId]);

  return (
    <>
      <Dialog
        open={addTemplateModal}
        onClose={closeAddTemplateModal}
        aria-labelledby="alert-dialog-title"
        fullWidth
        maxWidth="sm"
        aria-describedby="alert-dialog-description"
      >
        <div className="container">
          <DialogTitle id="alert-dialog-title" sx={{ float: "left" }}>
            Add a new template
          </DialogTitle>
          <DialogActions>
            <Button color="error" onClick={closeAddTemplateModal}>
              <CloseIcon />
            </Button>
          </DialogActions>
        </div>

        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            multiline
            rows={1}
            sx={{ marginBottom: "1rem" }}
            name="title"
            value={messageToEdit.title}
            onChange={(e) => {
              let { name, value } = e.target;

              setMessageToEdit((prev) => {
                return {
                  ...prev,
                  [name]: value,
                };
              });
            }}
          />
          <TextField
            fullWidth
            label="Message subject"
            multiline
            rows={1}
            sx={{ marginBottom: "1rem" }}
            name="subject"
            value={messageToEdit.subject}
            onChange={(e) => {
              let { name, value } = e.target;

              setMessageToEdit((prev) => {
                return {
                  ...prev,
                  [name]: value,
                };
              });
            }}
          />
          <TextField
            fullWidth
            label="Message body"
            multiline
            rows={6}
            sx={{ marginBottom: "1rem" }}
            name="body"
            value={messageToEdit.body}
            onChange={(e) => {
              let { name, value } = e.target;
              console.log(name, value);

              setMessageToEdit((prev) => {
                return {
                  ...prev,
                  [name]: value,
                };
              });
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button color="error" onClick={closeAddTemplateModal} autoFocus>
            Close
          </Button>
          {isEditing ? (
            <Button autoFocus onClick={editTemplate}>
              Edit
            </Button>
          ) : (
            <Button autoFocus onClick={addNewTemplate}>
              Submit
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Head>
        <title>Dashboard: Templates | Material Kit Pro</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container justifyContent="space-between" spacing={3}>
            <Grid item>
              <Typography variant="h4">Templates</Typography>
            </Grid>
            <Grid item>
              <Button
                startIcon={<PlusIcon fontSize="small" />}
                variant="contained"
                onClick={() => {
                  setMessageId(null);
                  setIsEditing(false);
                  setAddTemplateModal(true);
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
                  <TableCell>S.No </TableCell>
                  <TableCell>Title </TableCell>
                  <TableCell>Message subject </TableCell>
                  <TableCell>Message body</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredTemplates &&
                  filteredTemplates.map((message, index) => {
                    return (
                      <TableRow
                        hover
                        sx={{ cursor: "pointer" }}
                        key={message._id}
                      >
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="left">{message.title}</TableCell>
                        <TableCell align="left">{message.subject}</TableCell>
                        <TableCell align="left">{message.body}</TableCell>

                        <TableCell align="center">
                          <Tooltip title="Edit">
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                              onClick={() => {
                                openAddTemplateModal(message._id);
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              onClick={() => {
                                deleteTemplate(message._id);
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

Templates.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Templates;

// <TableRow hover sx={{ cursor: "pointer" }}>
//                   <TableCell align="center">1</TableCell>

//                   <TableCell align="left">Title 1</TableCell>

//                   <TableCell align="left">Bug report</TableCell>

//                   <TableCell align="left">
//                     The xyz component is not displaying properly. Please check
//                     the component and refactor it
//                   </TableCell>

//                   <TableCell align="center">
//                     <Tooltip title="Edit">
//                       <IconButton
//                         color="primary"
//                         aria-label="upload picture"
//                         component="span"
//                       >
//                         <EditIcon />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Delete">
//                       <IconButton
//                         color="error"
//                         aria-label="upload picture"
//                         component="span"
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </Tooltip>
//                   </TableCell>
//                 </TableRow>

//                 <TableRow hover sx={{ cursor: "pointer" }}>
//                   <TableCell align="center">2</TableCell>

//                   <TableCell align="left">Title 2</TableCell>

//                   <TableCell align="left">Push changes</TableCell>

//                   <TableCell align="left">
//                     Please push all the changes made to the project by
//                     dd/mm/yyyy
//                   </TableCell>

//                   <TableCell align="center">
//                     <Tooltip title="Edit">
//                       <IconButton
//                         color="primary"
//                         aria-label="upload picture"
//                         component="span"
//                       >
//                         <EditIcon />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Delete">
//                       <IconButton
//                         color="error"
//                         aria-label="upload picture"
//                         component="span"
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </Tooltip>
//                   </TableCell>
//                 </TableRow>

//                 <TableRow hover sx={{ cursor: "pointer" }}>
//                   <TableCell align="center">3</TableCell>

//                   <TableCell align="left">Title 3</TableCell>

//                   <TableCell align="left">Code review</TableCell>

//                   <TableCell align="left">
//                     Please review the code sent by abc@gmail.com
//                   </TableCell>

//                   <TableCell align="center">
//                     <Tooltip title="Edit">
//                       <IconButton
//                         color="primary"
//                         aria-label="upload picture"
//                         component="span"
//                       >
//                         <EditIcon />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Delete">
//                       <IconButton
//                         color="error"
//                         aria-label="upload picture"
//                         component="span"
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </Tooltip>
//                   </TableCell>
//                 </TableRow>

//                 <TableRow hover sx={{ cursor: "pointer" }}>
//                   <TableCell align="center">4</TableCell>

//                   <TableCell align="left">Title 4</TableCell>

//                   <TableCell align="left">Project report due</TableCell>

//                   <TableCell align="left">
//                     Please submit a report on the progress of the current
//                     project by dd/mm/yyyy to abc@gmail.com
//                   </TableCell>

//                   <TableCell align="center">
//                     <Tooltip title="Edit">
//                       <IconButton
//                         color="primary"
//                         aria-label="upload picture"
//                         component="span"
//                       >
//                         <EditIcon />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Delete">
//                       <IconButton
//                         color="error"
//                         aria-label="upload picture"
//                         component="span"
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </Tooltip>
//                   </TableCell>
//                 </TableRow>
