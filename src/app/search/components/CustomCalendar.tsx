"use client";

import React, { useEffect, useState } from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // Default styles
import "react-date-range/dist/theme/default.css"; // Theme styles
import { useAuthContext } from "../AuthContext/Authcontext";

interface CustomCalendarProps {
  selectedOptions: any; // or define the type of selectedOptions more specifically
  setSelectedOptions: (options: any) => void; // or define the type of setSelectedOptions more specifically
  type: string;
  name: string;
}

interface SelectedOptions {
  [key: string]: {
    [key: string]: {
      startDate: Date;
      endDate: Date;
    };
  };
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  selectedOptions,
  type,
  name,
  setSelectedOptions,
}) => {
  const { range, setRange } = useAuthContext();

  useEffect(() => {
    const startDate = range[0]?.startDate;
    const endDate = range[0]?.endDate;
    setSelectedOptions((prevOptions: SelectedOptions) => ({
      ...prevOptions,
      [type]: {
        ...prevOptions[type],
        [name?.replace(" ", "")]: {
          startDate: startDate,
          endDate: endDate,
        },
      },
    }));
  }, [range, setSelectedOptions, type, name]);

  const handleSelect = (ranges: RangeKeyDict) => {
    setRange([
      {
        startDate: ranges.selection?.startDate ?? new Date(),
        endDate: ranges.selection?.endDate ?? new Date(),
        key: "selection",
      },
    ]);
  };

  return (
    <DateRange
      ranges={range}
      onChange={handleSelect}
      maxDate={new Date()}
      showMonthAndYearPickers
      rangeColors={["#0057ff"]} // Custom color for selected range
      showDateDisplay={true} // Hide top date display
    />
  );
};

export default CustomCalendar;
