import { Button, Flex, Box } from "@chakra-ui/react";
import React ,{useState} from "react";
import FormInput from "../../components/formComponents/FormInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageNumbers } from "../../interface/home";
import { IJobDetails } from "../../interface/forms";


interface JobDetailsFormProps {
  handleTab: (n: PageNumbers) => void;
  handleJobDetailsSubmit: (values: IJobDetails ) => void;
}

// const JobDetailsForm: React.FC<{
//   handleTab: (n: PageNumbers) => void;
// }> = ({ handleTab }) => {
  const JobDetailsForm: React.FC<JobDetailsFormProps> = ({
    handleTab,
    handleJobDetailsSubmit,
  }) => {
    const [serInputJob, setUserInputJob] = useState<IJobDetails>({
      jobTitle: "",
      jobDetails: "",
      jobLocation: "",
    });

  const { 
   
    setFieldTouched,
    setFieldValue,
    handleChange, 
    errors,
     touched, 
     handleBlur,
      handleSubmit, 
      values } =
    useFormik<IJobDetails>({
      initialValues: {
        jobTitle: "",
        jobDetails: "",
        jobLocation: "",
      },
      validationSchema: Yup.object().shape({
        jobTitle: Yup.string().required("Job Title is required"),
        jobDetails: Yup.string().required("Job Details is required"),
        jobLocation: Yup.string().required("Job Location is required"),
        jobPosition: Yup.string().required("Job position is required"),
      }),
      onSubmit: (values) => {
        handleJobDetailsSubmit(values);
        handleTab(2);
      },
    });
    
  const handleInputChange = (field: keyof IJobDetails, value: any) => {
    setUserInputJob((prevInputs) => ({
      ...prevInputs,
      [field]: value,
    }));
  };

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          
          onChange={(e) => {
            handleChange(e);
            handleInputChange("jobTitle", e.target.value);
            setFieldValue("jobTitle", e.target.value);
          }}
          onBlur={handleBlur}
          value={values?.jobTitle}
          error={errors?.jobTitle}
          touched={touched?.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={(e) => {
            handleChange(e);
            handleInputChange("jobDetails", e.target.value);
            setFieldValue("jobDetails", e.target.value);
          }}
          onBlur={handleBlur}
          value={values?.jobDetails}
          error={errors?.jobDetails}
          touched={touched?.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={(e) => {
            handleChange(e);
            handleInputChange("jobLocation", e.target.value);
            setFieldValue("jobLocation", e.target.value);
          }}
          onBlur={handleBlur}
          error={errors.jobLocation}
          touched={touched.jobLocation}
          value={values.jobLocation}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => handleTab(0)}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;