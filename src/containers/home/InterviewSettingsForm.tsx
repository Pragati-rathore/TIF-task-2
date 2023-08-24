import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import FormSelect from "../../components/formComponents/FormSelect";
import { useFormik } from "formik";
import { PageNumbers } from "../../interface/home";
import * as Yup from "yup";
import { IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";

interface InterviewDetailsFormProps {
  handleTab: (n: PageNumbers) => void;
  handleInterviewDetailsSubmit: (values: IInterViewSettings) => void;
}

const InterviewDetailsForm: React.FC<InterviewDetailsFormProps> = ({
  handleTab,
  handleInterviewDetailsSubmit,
}) => {
  const [userInterviewInput, setuserInterviewInput] =
    useState<IInterViewSettings>({
      interviewDuration: "",
      interviewLanguage: "",
      interviewMode: "",
    });
  const {
    errors,
    touched,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IInterViewSettings>({
    initialValues: {
      interviewMode: "",
      interviewDuration: "",
      interviewLanguage: "",
    },
    validationSchema: Yup.object().shape({
      interviewMode: Yup.string().required("Interview Mode is required"),
      interviewDuration: Yup.string().required(
        "Interview Duration is required"
      ),
      interviewLanguage: Yup.string().required(
        "Interview Language is required"
      ),
    }),
    onSubmit: (values) => {
      console.log({ values });
      alert("Form successfully submitted");
    },
  });

  const handleInputChangeInterview = (
    field: keyof IInterViewSettings,
    value: any
  ) => {
    setuserInterviewInput((prevInputs) => ({
      ...prevInputs,
      [field]: value,
    }));
  };
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <Box
      width="100%"
      as="form"
      onSubmit={handleInterviewDetailsSubmit(values) as any}
    >
      <Box width="100%">
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onChange={(field: string, value: any) => {
            setFieldValue(field, value);
            handleInputChangeInterview("interviewDuration", value);
          }}
          onBlur={setFieldTouched}
          value={values?.interviewMode}
          error={errors?.interviewMode}
          touched={touched?.interviewMode}
        />
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          onChange={(field: string, value: any) => {
            setFieldValue(field, value);
            handleInputChangeInterview("interviewDuration", value);
          }}
          onBlur={setFieldTouched}
          value={values?.interviewDuration}
          error={errors?.interviewDuration}
          touched={touched?.interviewDuration}
        />
        <FormSelect
          label="Job Location"
          name="interviewLanguage"
          placeholder="Select interview language"
          options={interviewLanguageOptions}
          onChange={(field: string, value: any) => {
            setFieldValue(field, value);
            handleInputChangeInterview("interviewLanguage", value);
          }}
          onBlur={setFieldTouched}
          error={errors.interviewLanguage}
          touched={touched.interviewLanguage}
          value={values.interviewLanguage}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => handleTab(1)}>
            Previous
          </Button>
          <Button
            colorScheme="red"
            type="submit"
            onClick={handleFormSubmit as any}
          >
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default InterviewDetailsForm;
