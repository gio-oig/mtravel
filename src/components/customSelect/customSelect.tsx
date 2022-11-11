import AsyncSelect from "react-select/async";
import { Props } from "react-select";
import { fetchCities } from "../../api";
import { toast } from "react-toastify";
import {
  asSelectData,
  excludeFormArray,
  transformDataForReactSelect,
} from "../../_helpers/functions";
import ErrorText from "../errorText/errorText";

export interface CustomSelectProps extends Props {
  error?: string | string[];
  label?: string;
  selectedCities: string[];
  handelSelect: (newValue: string | string[]) => void;
}

export type SelectCity = {
  value: string;
  label: string;
};

const CustomSelect = ({
  id,
  label,
  handelSelect,
  selectedCities,
  value,
  error,
  ...rest
}: CustomSelectProps) => {
  const loadOptions = (
    inputValue: string,
    callback: (options: SelectCity[]) => void
  ) => {
    if (!inputValue) return callback([]);

    fetchCities(inputValue)
      .then((data) => {
        const cityOptions = transformDataForReactSelect(data);
        callback(excludeFormArray(cityOptions, selectedCities));
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  const onChange = (option: any) => {
    if (rest.isMulti) {
      handelSelect((option as SelectCity[]).map(({ value }) => value));
    } else {
      handelSelect(option.value);
    }
  };

  return (
    <div className="form-item-container">
      {label && <label htmlFor={id}>{label}</label>}
      <div className="form-item-react-select">
        <AsyncSelect
          inputId={id}
          cacheOptions
          defaultOptions
          value={
            Array.isArray(value)
              ? value.map(asSelectData)
              : value
              ? asSelectData(value as string)
              : null
          }
          loadOptions={loadOptions}
          onChange={onChange}
          {...rest}
        />
        {error && <p className="error-message">{error}</p>}
        <ErrorText errorText={error} />
      </div>
    </div>
  );
};

export default CustomSelect;
