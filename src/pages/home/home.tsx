import DPicker from "../../components/datepicker/datepicker";
import CustomSelect from "../../components/customSelect/customSelect";
import { useEffect } from "react";
import { useFormik } from "formik";
import useQueryString from "../../hooks/useQueryString";
import { useNavigate } from "react-router-dom";
import { formSchema } from "../../_helpers/validation";
import ErrorText from "../../components/errorText/errorText";

import "./home.css";

export type FormInitState = {
  isIntermediate: boolean;
  originCity: string;
  intermediateCities: string[];
  destinationCity: string;
  date: string;
  numberOfPeople: number;
};

const initialValues: FormInitState = {
  isIntermediate: false,
  originCity: "",
  intermediateCities: [],
  destinationCity: "",
  date: "",
  numberOfPeople: 1,
};

const Home = () => {
  const navigate = useNavigate();
  const { parseQuery, updateSearchParams, search } = useQueryString();

  const getInitialValues = (): FormInitState => {
    const dataFromUrl = parseQuery() as Partial<FormInitState>;

    return {
      ...initialValues,
      ...dataFromUrl,
      isIntermediate: !!dataFromUrl.intermediateCities,
    };
  };

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: formSchema,
    onSubmit: () => {
      navigate(`/searchResult${search}`);
    },
  });

  const hasFormikError = (property: keyof FormInitState) => {
    const fieldError = formik.errors[property];
    const istouchedField = formik.touched[property];
    return fieldError && istouchedField ? fieldError : undefined;
  };

  const toggleIntermetiadteCities = () => {
    formik.setFieldValue("isIntermediate", !formik.values.isIntermediate);
  };

  useEffect(() => {
    updateSearchParams(formik.values);
  }, [formik.values]);

  useEffect(() => {
    formik.validateForm();
  }, []);

  const { originCity, destinationCity, intermediateCities } = formik.values;
  const datePickerDate = formik.values.date
    ? new Date(formik.values.date)
    : null;

  console.log(formik);

  return (
    <div className="form-container mt-1">
      <form onSubmit={formik.handleSubmit}>
        <CustomSelect
          id="mainCity"
          label="Origin City"
          name="originCity"
          value={originCity}
          error={hasFormikError("originCity")}
          onBlur={formik.handleBlur}
          selectedCities={[...intermediateCities, destinationCity]}
          handelSelect={(newValue) => {
            formik.setFieldValue("originCity", newValue);
          }}
        />
        {formik.values.isIntermediate && (
          <CustomSelect
            id="intermadiate"
            label="Intermadiate Cityies"
            isMulti
            name="intermediateCities"
            value={intermediateCities}
            error={hasFormikError("intermediateCities")}
            onBlur={formik.handleBlur}
            selectedCities={[originCity, destinationCity]}
            handelSelect={(newValues) => {
              formik.setFieldValue("intermediateCities", newValues);
            }}
          />
        )}
        <button
          type="button"
          className="button-4"
          onClick={toggleIntermetiadteCities}
        >
          {formik.values.isIntermediate ? "Hide" : "Add intermadiate cities"}
        </button>
        <CustomSelect
          id="destination"
          label="Destination"
          name="destinationCity"
          value={destinationCity}
          error={hasFormikError("destinationCity")}
          onBlur={formik.handleBlur}
          selectedCities={[originCity, ...intermediateCities]}
          handelSelect={(newValue) => {
            formik.setFieldValue("destinationCity", newValue);
          }}
        />
        <div className="form-item-container">
          <label htmlFor="numberOfPeople">Travel Date</label>
          <DPicker
            name="date"
            selected={datePickerDate}
            onBlur={formik.handleBlur}
            onChange={(val) => {
              if (val) formik.setFieldValue("date", val.toISOString());
            }}
          />
          <ErrorText errorText={hasFormikError("date")} />
        </div>

        <div className="form-item-container">
          <label htmlFor="numberOfPeople">Number of People</label>
          <input
            id="numberOfPeople"
            className="number-input"
            name="numberOfPeople"
            type="number"
            min={1}
            onBlur={formik.handleBlur}
            value={formik.values.numberOfPeople}
            onChange={formik.handleChange}
          />
          <ErrorText errorText={hasFormikError("numberOfPeople")} />
        </div>

        <button disabled={!formik.isValid} className="button-4" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Home;
