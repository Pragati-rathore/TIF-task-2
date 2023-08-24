import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  TabProps,
  Box,
  Grid,
} from "@chakra-ui/react";
import React, { useState } from "react";
import InterviewSettingsForm from "./InterviewSettingsForm";
import JobDetailsForm from "./JobDetailsForm";
import RequisitionForm from "./RequisitionDetailsForm";
import DisplayCard from "./PreviewCard";
import { PageNumbers } from "../../interface/home";
import {
  IJobDetails,
  IRequisitionDetails,
  IInterViewSettings,
} from "../../interface/forms";

const CustomTab: React.FC<TabProps> = ({ children, ...props }) => {
  return (
    <Tab p="1rem" fontFamily="Poppins" {...props}>
      {children}
    </Tab>
  );
};

const HomeLayout: React.FC = () => {
  const [page, setPage] = useState<PageNumbers>(0);

  const [userInput, setUserInput] = useState<IRequisitionDetails>({
    requisitionTitle: "",
    noOfOpenings: 0,
    urgency: "",
    gender: "",
  });
  const handleRequisitionSubmit = (values: IRequisitionDetails) => {
    setUserInput(values);
  };

  const [userInputJob, setUserInputJob] = useState<IJobDetails>({
    jobTitle: "",
    jobDetails: "",
    jobLocation: "",
  });
  const handleJobDetailsSubmit = (values: IJobDetails) => {
    setUserInputJob(values);
  };

  const [userInterviewInput, setuserInterviewInput] =
    useState<IInterViewSettings>({
      interviewMode: "",
      interviewDuration: "",
      interviewLanguage: "",
    });
  const handleInterviewDetailsSubmit = (values: IInterViewSettings) => {
    setuserInterviewInput(values);
  };

  return (
    <Box w="100%">
      <Container maxW="1200px">
        <Heading fontFamily="Poppins" fontSize="1.5rem" my="2rem">
          Create Candidate Requisition
        </Heading>
        <Tabs index={page} isLazy lazyBehavior="keepMounted">
          <TabList>
            <CustomTab>Requistion Details</CustomTab>
            <CustomTab>Job Details</CustomTab>
            <CustomTab>Interview Settings</CustomTab>
          </TabList>
          <Grid display="grid" gridTemplateColumns="3fr 2fr" gap="24px">
            <TabPanels>
              <TabPanel>
                <RequisitionForm
                  handleTab={(n) => setPage(n)}
                  handleRequisitionSubmit={handleRequisitionSubmit}
                />
              </TabPanel>
              <TabPanel>
                <JobDetailsForm
                  handleTab={(n) => setPage(n)}
                  handleJobDetailsSubmit={handleJobDetailsSubmit}
                />
              </TabPanel>
              <TabPanel>
                <InterviewSettingsForm
                  handleTab={(n) => setPage(n)}
                  handleInterviewDetailsSubmit={handleInterviewDetailsSubmit}
                />
              </TabPanel>
            </TabPanels>
            <DisplayCard
              userInput={userInput}
              userInputJob={userInputJob}
              userInterviewInput={userInterviewInput}
            />
          </Grid>
        </Tabs>
      </Container>
    </Box>
  );
};

export default HomeLayout;
