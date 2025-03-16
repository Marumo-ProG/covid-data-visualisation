import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function BasicDatePicker({ minDate, maxDate, defaultDate, handleOnChange }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
                <DatePicker
                    onChange={handleOnChange}
                    size="small"
                    label="Filter by Date:"
                    inputFormat="yyyy/MM/dd"
                    value={defaultDate}
                    minDate={minDate}
                    maxDate={maxDate}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}
