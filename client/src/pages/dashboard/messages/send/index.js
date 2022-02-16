import React, { useEffect, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { FileDropzone } from "../../../../components/file-dropzone";
import { QuillEditor } from "../../../../components/quill-editor";
import { ArrowLeft as ArrowLeftIcon } from "../../../../icons/arrow-left";
import { DotsVertical as DotsHorizontalIcon } from "../../../../icons/dots-vertical";
import { gtm } from "../../../../lib/gtm";
import { fileToBase64 } from "../../../../utils/file-to-base64";
import { AuthGuard } from "../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout";

import SendIcon from "@mui/icons-material/Send";

const steps = [
  "Add Contact Details",
  "Add Repair Information",
  "Create a Repair",
];

const vehicleSearchOpts = [
  { namePlate: "MH15HJ5609, Tata Harrier" },
  { namePlate: "MH15HJ9909, Mahindra Thar" },
  { namePlate: "MH13HJ1009, Suzuki WagonR" },
  { namePlate: "MH15HJ9809, Mahindra Thar" },
  { namePlate: "MH12HJ3909, Toyota Etios" },
];

const contactSearchOpts = [
  { nameNumber: "Harish Chavan, 7878787999" },
  { nameNumber: "Suresh Bhat, 8787328394" },
  { nameNumber: "Shivanshu Gupta, 5664884343" },
  { nameNumber: "Rahul Kumar, 583467287" },
  { nameNumber: "Ramesh Singh, 349762976" },
  { nameNumber: "Suresh Bhat, 1234567890" },
];

const numbers = [
  { num: "123456789" },
  { num: "545456455" },
  { num: "212121215" },
  { num: "87897484654" },
  { num: "54545613187" },
  { num: "4525424" },
  { num: "454224522" },
  { num: "'5446576789" },
];
const emails = [
  { email: "a@b.com" },
  { email: "a@b.com" },
  { email: "a@b.com" },
  { email: "a@b.com" },
  { email: "a@b.com" },
];
const AddNewRepair = () => {
  const [receiver, setReceiver] = React.useState([]);
  const [checked, setChecked] = React.useState(false);

  const handleChange1 = (event) => {
    setChecked(!checked);
  };

  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;
    setReceiver(typeof value === "string" ? value.split(",") : value);
  };

  const [value, setValue] = useState("Email");

  const handleChange = (e) => {
    setChecked(false);
    setReceiver([]);
    setValue(e.target.value);
  };
  const [cover, setCover] = useState("/static/mock-images/covers/cover_4.jpeg");

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  const handleDropCover = async ([file]) => {
    const data = await fileToBase64(file);
    setCover(data);
  };

  const handleRemove = () => {
    setCover(null);
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Head>
        <title>Add new Repair | Repair Logging</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          {/* <NextLink href="/dashboard/repair" passHref>
            <Button
              component="a"
              startIcon={<ArrowLeftIcon fontSize="medium" />}
            >
              Repairs
            </Button>
          </NextLink> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 3,
              alignItems: "center",
            }}
          >
            <Typography variant="h3">Send Message</Typography>
            <TextField
              select
              sx={{ width: "30%" }}
              value={value}
              onChange={handleChange}
              label="Select Mode"
            >
              <MenuItem value="Email">Email</MenuItem>
              <MenuItem value="SMS">SMS</MenuItem>
            </TextField>
          </Box>

          <Box
            sx={{
              mt: 4,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "60%" }}>
              {value === "Email" ? (
                <>
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      label="Sender Email"
                      defaultValue="Email@email.com"
                    ></TextField>
                    <TextField fullWidth label="Enter Subject"></TextField>
                    <TextField
                      fullWidth
                      label="Enter Message"
                      multiline
                      rows={6}
                    ></TextField>
                    <FormControl sx={{}}>
                      <InputLabel id="demo-multiple-checkbox-label">
                        Receiver
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={receiver}
                        onChange={handleChange2}
                        input={<OutlinedInput label="Receiver" />}
                        renderValue={(selected) => selected.join(", ")}
                        // MenuProps={MenuProps}
                      >
                        <MenuItem key="Select All" value="All Emails Selected">
                          <Checkbox
                            onChange={handleChange1}
                            checked={checked}
                          />
                          <ListItemText primary="Select All" />
                        </MenuItem>
                        {emails.map((email) => (
                          <MenuItem
                            key={email.email}
                            value={email.email}
                            disabled={checked ? true : false}
                          >
                            <Checkbox
                              checked={
                                checked
                                  ? true
                                  : receiver.indexOf(email.email) > -1
                              }
                            />
                            <ListItemText primary={email.email} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Button
                      sx={{ bgcolor: "#10B981" }}
                      variant="contained"
                      startIcon={<SendIcon />}
                      href="/dashboard/messages/send"
                    >
                      Send Email
                    </Button>
                  </Stack>
                </>
              ) : value === "SMS" ? (
                <>
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      label="Sender Number"
                      defaultValue="9876543321"
                    ></TextField>
                    <TextField fullWidth label="Enter Title"></TextField>
                    <TextField
                      fullWidth
                      label="Enter Message"
                      multiline
                      rows={6}
                    ></TextField>
                    <FormControl sx={{}}>
                      <InputLabel id="demo-multiple-checkbox-label">
                        Receiver
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={receiver}
                        onChange={handleChange2}
                        input={<OutlinedInput label="Receiver" />}
                        renderValue={(selected) => selected.join(", ")}
                        // MenuProps={MenuProps}
                      >
                        <MenuItem key="Select All" value="All Numbers Selected">
                          <Checkbox
                            onChange={handleChange1}
                            checked={checked}
                          />
                          <ListItemText primary="Select All" />
                        </MenuItem>
                        {numbers.map((num) => (
                          <MenuItem
                            key={num.num}
                            value={num.num}
                            disabled={checked ? true : false}
                          >
                            <Checkbox
                              checked={
                                checked ? true : receiver.indexOf(num.num) > -1
                              }
                            />
                            <ListItemText primary={num.num} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Button
                      sx={{ bgcolor: "#10B981" }}
                      variant="contained"
                      startIcon={<SendIcon />}
                      href="/dashboard/messages/send"
                    >
                      Send SMS
                    </Button>
                  </Stack>
                </>
              ) : null}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

AddNewRepair.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default AddNewRepair;
