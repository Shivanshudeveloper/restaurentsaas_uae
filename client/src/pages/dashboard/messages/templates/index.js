import React, { useCallback, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
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
    DialogContent, DialogActions, DialogTitle
} from '@mui/material';
import TableHead from '@mui/material/TableHead';
import { AuthGuard } from '../../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout';
import { Plus as PlusIcon } from '../../../../icons/plus';
import Paper from '@mui/material/Paper';
import { IconButton, Tooltip, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DatePicker, TimePicker } from "@mui/lab";
import Chip from '@mui/material/Chip';

const Templates = () => {
    // For add reservation dialog box
    let [addTemplateModal, setAddTemplateModal] = useState(false)

    function closeAddTemplateModal() {
        setAddTemplateModal(false)
    }

    // State(s) for adding a new message template
    let [newMessage, setNewMessage] = useState({
        title: "",
        subject: "",
        body: ""
    })

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
                        value={newMessage.title}
                        onChange={(e) => {
                            let { name, value } = e.target

                            setNewMessage((prev) => {
                                return {
                                    ...prev,
                                    [name]: value
                                }
                            })
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Message subject"
                        multiline
                        rows={1}
                        sx={{ marginBottom: "1rem" }}
                        name="subject"
                        value={newMessage.subject}
                        onChange={(e) => {
                            let { name, value } = e.target

                            setNewMessage((prev) => {
                                return {
                                    ...prev,
                                    [name]: value
                                }
                            })
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Message body"
                        multiline
                        rows={6}
                        sx={{ marginBottom: "1rem" }}
                        name="body"
                        value={newMessage.body}
                        onChange={(e) => {
                            let { name, value } = e.target

                            setNewMessage((prev) => {
                                return {
                                    ...prev,
                                    [name]: value
                                }
                            })
                        }}
                    />
                </DialogContent>

                <DialogActions>
                    <Button color="error" onClick={closeAddTemplateModal} autoFocus>
                        Close
                    </Button>
                    <Button autoFocus>
                        Submit
                    </Button>
                </DialogActions>

            </Dialog>

            <Head>
                <title>
                    Dashboard: Templates | Material Kit Pro
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="lg">
                    <Grid
                        container
                        justifyContent="space-between"
                        spacing={3}
                    >
                        <Grid item>
                            <Typography variant="h4">
                                Templates
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                startIcon={<PlusIcon fontSize="small" />}
                                variant="contained"
                                onClick={() => {
                                    setAddTemplateModal(true)
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
                                    <TableCell >Message body</TableCell>
                                    <TableCell >Actions</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>

                                <TableRow
                                    hover
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <TableCell align="center">
                                        1
                                    </TableCell>

                                    <TableCell align="left">
                                        Title 1
                                    </TableCell>

                                    <TableCell align="left">
                                        Bug report
                                    </TableCell>

                                    <TableCell align="left">
                                        The xyz component is not displaying properly.
                                        Please check the component and refactor it
                                    </TableCell>

                                    <TableCell align="center">
                                        <Tooltip title="Edit">
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton color="error" aria-label="upload picture" component="span">
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>

                                <TableRow
                                    hover
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <TableCell align="center">
                                        2
                                    </TableCell>

                                    <TableCell align="left">
                                        Title 2
                                    </TableCell>

                                    <TableCell align="left">
                                        Push changes
                                    </TableCell>

                                    <TableCell align="left">
                                        Please push all the changes made to the project by dd/mm/yyyy
                                    </TableCell>

                                    <TableCell align="center">
                                        <Tooltip title="Edit">
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton color="error" aria-label="upload picture" component="span">
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>

                                <TableRow
                                    hover
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <TableCell align="center">
                                        3
                                    </TableCell>

                                    <TableCell align="left">
                                        Title 3
                                    </TableCell>

                                    <TableCell align="left">
                                        Code review
                                    </TableCell>

                                    <TableCell align="left">
                                        Please review the code sent by abc@gmail.com
                                    </TableCell>

                                    <TableCell align="center">
                                        <Tooltip title="Edit">
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton color="error" aria-label="upload picture" component="span">
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>

                                <TableRow
                                    hover
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <TableCell align="center">
                                        4
                                    </TableCell>

                                    <TableCell align="left">
                                        Title 4
                                    </TableCell>

                                    <TableCell align="left">
                                        Project report due
                                    </TableCell>

                                    <TableCell align="left">
                                        Please submit a report on the progress of the current project by dd/mm/yyyy to abc@gmail.com
                                    </TableCell>

                                    <TableCell align="center">
                                        <Tooltip title="Edit">
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton color="error" aria-label="upload picture" component="span">
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>


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
        <DashboardLayout>
            {page}
        </DashboardLayout>
    </AuthGuard>
);

export default Templates;
