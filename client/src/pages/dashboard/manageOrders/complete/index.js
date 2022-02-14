import { Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Container,
  Grid,
  IconButton,
  MenuItem,
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

const CompleteList = () => {
  const columns = [
    { label: "Sl", minWidth: 10, maxWidth: 30 },
    { label: "Invoice No.", minWidth: 50, maxWidth: 100 },
    { label: "Name", minWidth: 50, maxWidth: 100 },
    { label: "Waiter", minWidth: 50, maxWidth: 100 },
    { label: "Table", minWidth: 50, maxWidth: 100 },
    { label: "Status", minWidth: 50, maxWidth: 100 },
    { label: "Order Date", minWidth: 50, maxWidth: 100 },
    { label: "Amount", minWidth: 50, maxWidth: 100 },
    { label: "Actions", minWidth: 50, maxWidth: 100 },
  ];

  const createData = (invnum, name, wtr, tbl, stat, date, amt) => {
    return { invnum, name, wtr, tbl, stat, date, amt };
  };

  const rows = [
    createData(
      "500",
      "Walkin",
      "Rahul Kumar",
      "Table-3",
      "PAID",
      "Nov 20, 2021",
      "2599"
    ),
    createData(
      "400",
      "Walkin",
      "Rahul Kumar",
      "Table-3",
      "PENDING",
      "Nov 20, 2021",
      "2599"
    ),
    createData(
      "300",
      "Walkin",
      "Rahul Kumar",
      "Table-3",
      "PAID",
      "Nov 20, 2021",
      "2599"
    ),
    createData(
      "600",
      "Walkin",
      "Rahul Kumar",
      "Table-3",
      "PAID",
      "Nov 20, 2021",
      "2599"
    ),
  ];
  return (
    <>
      <Head>
        <title>Completed Orders List</title>
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
                <Typography variant="h4">Completed Orders List</Typography>
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
          </Box>
        </Container>
      </Box>
    </>
  );
};

CompleteList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CompleteList;
