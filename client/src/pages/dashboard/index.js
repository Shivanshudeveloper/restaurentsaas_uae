import { useEffect, useState } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
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
import { AuthGuard } from "../../components/authentication/auth-guard";
import { DashboardLayout } from "../../components/dashboard/dashboard-layout";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { OverviewBanner } from "../../components/dashboard/overview/overview-banner";
import { OverviewCryptoWallet } from "../../components/dashboard/overview/overview-crypto-wallet";
import { OverviewInbox } from "../../components/dashboard/overview/overview-inbox";
import { OverviewLatestTransactions } from "../../components/dashboard/overview/overview-latest-transactions";
import { OverviewPrivateWallet } from "../../components/dashboard/overview/overview-private-wallet";
import { OverviewTotalBalance } from "../../components/dashboard/overview/overview-total-balance";
import { OverviewTotalTransactions } from "../../components/dashboard/overview/overview-total-transactions";
import { ArrowRight as ArrowRightIcon } from "../../icons/arrow-right";
import { Briefcase as BriefcaseIcon } from "../../icons/briefcase";
import { Download as DownloadIcon } from "../../icons/download";
import { ExternalLink as ExternalLinkIcon } from "../../icons/external-link";
import { InformationCircleOutlined as InformationCircleOutlinedIcon } from "../../icons/information-circle-outlined";
import { Reports as ReportsIcon } from "../../icons/reports";
import { Users as UsersIcon } from "../../icons/users";
import { gtm } from "../../lib/gtm";
import useSessionStorage from "../../hooks/useSessionStorage";
import { API_SERVICE } from "../../config";

import axios from "axios";

const Overview = () => {
  const [displayBanner, setDisplayBanner] = useState(false);
  const userId = useSessionStorage("userId");
  const [orders, setOrders] = useState([]);
  const columns = [
    { label: "Sl", minWidth: 10, maxWidth: 30 },
    { label: "Inv No.", minWidth: 50, maxWidth: 100 },
    { label: "Name", minWidth: 50, maxWidth: 100 },
    { label: "Email", minWidth: 50, maxWidth: 100 },
    { label: "Phone", minWidth: 50, maxWidth: 100 },
    { label: "From", minWidth: 50, maxWidth: 100 },
    { label: "Status", minWidth: 50, maxWidth: 100 },
    { label: "Order Date", minWidth: 50, maxWidth: 100 },
    { label: "Amount", minWidth: 50, maxWidth: 100 },
    { label: "Actions", minWidth: 50, maxWidth: 100 },
  ];

  const ordersCountByStatus = (status) =>
    orders.filter((order) => order.status == status);

  function getFormattedDate(date) {
    date = new Date(date);
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return day + " / " + month + " / " + year;
  }

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(() => {
    // Restore the persistent state from local/session storage
    const value = globalThis.sessionStorage.getItem("dismiss-banner");

    if (value === "true") {
      // setDisplayBanner(false);
    }
  }, []);

  const handleDismissBanner = () => {
    // Update the persistent state
    // globalThis.sessionStorage.setItem('dismiss-banner', 'true');
    setDisplayBanner(false);
  };

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`${API_SERVICE}/get_orders/${userId}`)
      .then((res) => {
        console.log(res.data);
        setOrders(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  return (
    <>
      <Head>
        <title>Dashboard: Overview | Material Kit Pro</title>
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
            <h1>Orders</h1>
            <Stack direction="row" sx={{ mb: 2, mt: 2 }} spacing={2}>
              <Card sx={{ p: 5, width: "100%" }} variant="outlined">
                <center>
                  <Typography variant="h5">
                    {ordersCountByStatus(1).length}
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 2 }}>
                    Pending
                  </Typography>
                </center>
              </Card>
              <Card sx={{ p: 5, width: "100%" }} variant="outlined">
                <center>
                  <Typography variant="h5">
                    {ordersCountByStatus(2).length}
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 2 }}>
                    Completed
                  </Typography>
                </center>
              </Card>
              <Card sx={{ p: 5, width: "100%" }} variant="outlined">
                <center>
                  <Typography variant="h5">
                    {ordersCountByStatus(3).length}
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 2 }}>
                    Cancelled
                  </Typography>
                </center>
              </Card>
            </Stack>

            <Grid item container sx={{ mt: 5 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {columns.map((column, id) => (
                      <TableCell align="center">{column.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order, id) => (
                    <TableRow hover key={order._id}>
                      <TableCell align="center">{id + 1}</TableCell>
                      <TableCell align="center">
                        {order.invoiceNumber}
                      </TableCell>
                      <TableCell align="center">{order.name}</TableCell>
                      <TableCell align="center">{order.email}</TableCell>
                      <TableCell align="center">{order.phone}</TableCell>
                      <TableCell align="center">{order.from}</TableCell>
                      <TableCell align="center">
                        {order.status == 1
                          ? "Pending"
                          : order.status == 2
                          ? "Completed"
                          : "Canceled"}
                      </TableCell>
                      <TableCell align="center">
                        {getFormattedDate(order.orderDate)}
                      </TableCell>
                      <TableCell align="center">{order.amount}</TableCell>
                      <TableCell align="center">
                        <IconButton size="small">
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>

            {/* <Grid container justifyContent="space-between" spacing={3}>
              <Grid item sx={12} md={4}>
                {`Pending ${filteredOrders(1).length}`}
              </Grid>
              <Grid item sx={12} md={4}>
                {`Completed ${filteredOrders(2).length}`}
              </Grid>
              <Grid item sx={12} md={4}>
                {`Cancelled ${filteredOrders(3).length}`}
              </Grid>
            </Grid> */}
          </Box>
        </Container>
      </Box>
    </>
  );
};

Overview.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Overview;
