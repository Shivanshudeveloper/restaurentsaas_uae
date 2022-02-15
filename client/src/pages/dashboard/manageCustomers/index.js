import { Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Container,
  Grid,
  IconButton,
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
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import VisibilityIcon from "@mui/icons-material/Visibility";

const CustomersList = () => {
  const columns = [
    { label: "Sl", minWidth: 10, maxWidth: 30 },
    { label: "Title", minWidth: 50, maxWidth: 100 },
    { label: "Name", minWidth: 50, maxWidth: 100 },
    { label: "Review Text", minWidth: 50, maxWidth: 100 },
    { label: "Rating", minWidth: 50, maxWidth: 100 },
    { label: "Email Address", minWidth: 50, maxWidth: 100 },
    { label: "Actions", minWidth: 50, maxWidth: 100 },
  ];

  const createData = (title, name, rev, rating, email) => {
    return { title, name, rev, rating, email };
  };

  const rows = [
    createData("dummy", "Dummy", "Very Good", "5.00", "email@gmail.com"),
    createData("dummy", "Dummy", "Very Good", "5.00", "email@gmail.com"),
    createData("dummy", "Dummy", "Very Good", "5.00", "email@gmail.com"),
    createData("dummy", "Dummy", "Very Good", "5.00", "email@gmail.com"),
    createData("dummy", "Dummy", "Very Good", "5.00", "email@gmail.com"),
    createData("dummy", "Dummy", "Very Good", "5.00", "email@gmail.com"),
    createData("dummy", "Dummy", "Very Good", "5.00", "email@gmail.com"),
    createData("dummy", "Dummy", "Very Good", "5.00", "email@gmail.com"),
  ];
  return (
    <>
      <Head>
        <title>Customers List</title>
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
                <Typography variant="h4">Customers</Typography>
              </Grid>
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
                      <TableCell align="center">{row.title}</TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.rev}</TableCell>
                      <TableCell align="center">{row.rating}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
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

CustomersList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CustomersList;
