import DatePicker, { ReactDatePickerProps } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

type DPickerProps = {} & ReactDatePickerProps;

const DPicker = ({ selected, onChange, ...rest }: DPickerProps) => {
  return (
    <DatePicker
      className="date-picker"
      {...(selected ? { selected } : null)}
      selected={selected}
      placeholderText="select date"
      minDate={new Date()}
      onChange={onChange}
      {...rest}
    />
  );
};

export default DPicker;
