import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageNumbers } from "../../interface/home";
import { IRequisitionDetails } from "../../interface/forms";
import { genderOptions, urgencyOptions } from "./constants";

interface RequisitionDetailsFormProps {
  handleTab: (n: PageNumbers) => void;
  handleRequisitionSubmit: (values: IRequisitionDetails) => void;
}

const RequisitionDetailsForm: React.FC<RequisitionDetailsFormProps> = ({
  handleTab,
  handleRequisitionSubmit,
}) => {
  const [userInput, setUserInput] = useState<IRequisitionDetails>({
    requisitionTitle: "",
    noOfOpenings: 0,
    urgency: "",
    gender: "",
  });

  const {
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
    isValid,
  } = useFormik<IRequisitionDetails>({
    initialValues: {
      requisitionTitle: "",
      noOfOpenings: 0,
      urgency: "",
      gender: "",
    },
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .min(1, "Enter a valid number"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {
      handleRequisitionSubmit(values);
      console.log(values);
      handleTab(1);
    },
  });

  const handleInputChange = (field: keyof IRequisitionDetails, value: any) => {
    setUserInput((prevInputs) => ({
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
      onSubmit={handleRequisitionSubmit(values) as any}
    >
      <Box width="100%">
        <FormInput
          label="Requisition Title"
          placeholder="Enter requisition title"
          name="requisitionTitle"
          onChange={(e) => {
            handleChange(e);
            handleInputChange("requisitionTitle", e.target.value);
          }}
          onBlur={handleBlur}
          value={values?.requisitionTitle}
          error={errors?.requisitionTitle}
          touched={touched?.requisitionTitle}
        />
        <FormInput
          label="Number of openings"
          placeholder="Enter number of openings"
          name="noOfOpenings"
          onChange={(e) => {
            handleChange(e);
            handleInputChange("noOfOpenings", e.target.value);
          }}
          onBlur={handleBlur}
          value={values?.noOfOpenings}
          error={errors?.noOfOpenings}
          touched={touched?.noOfOpenings}
        />
        <FormSelect
          label="Gender"
          name="gender"
          placeholder="Select gender"
          options={genderOptions}
          onChange={(field: string, value: any) => {
            setFieldValue(field, value);
            handleInputChange("gender", value);
          }}
          onBlur={setFieldTouched}
          error={errors.gender}
          touched={touched.gender}
          value={values.gender}
        />
        <FormSelect
          label="Urgency"
          name="urgency"
          placeholder="Select urgency"
          options={urgencyOptions}
          onChange={(field: string, value: any) => {
            setFieldValue(field, value);
            handleInputChange("urgency", value);
          }}
          onBlur={setFieldTouched}
          error={errors.urgency}
          touched={touched.urgency}
          value={values.urgency}
        />
        <Flex w="100%" justify="flex-end" mt="4rem">
          <Button
            colorScheme="red"
            type="submit"
            onClick={handleFormSubmit as any}
          >
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default RequisitionDetailsForm;
