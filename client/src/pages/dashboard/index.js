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
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AuthGuard } from "../../components/authentication/auth-guard";
import { DashboardLayout } from "../../components/dashboard/dashboard-layout";
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

  const filteredOrders = (status) =>
    orders.filter((order) => order.status == status);

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
            <Stack direction="row" sx={{ mb: 2, mt: 2 }} spacing={2}>
              <Card sx={{ p: 5, width: "100%" }} variant="outlined">
                <center>
                  <Typography variant="h5">
                    {filteredOrders(1).length}
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 2 }}>
                    Pending
                  </Typography>
                </center>
              </Card>
              <Card sx={{ p: 5, width: "100%" }} variant="outlined">
                <center>
                  <Typography variant="h5">
                    {filteredOrders(2).length}
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 2 }}>
                    Completed
                  </Typography>
                </center>
              </Card>
              <Card sx={{ p: 5, width: "100%" }} variant="outlined">
                <center>
                  <Typography variant="h5">
                    {filteredOrders(3).length}
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 2 }}>
                    Cancelled
                  </Typography>
                </center>
              </Card>
            </Stack>

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
