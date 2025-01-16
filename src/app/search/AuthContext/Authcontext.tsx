// src/app/search/AuthContext/Authcontext.tsx
"use client";

import { createContext, useState, ReactNode, useContext } from "react";

interface AuthContextType {
  selectedsearchResultValue: string;
  setSelectedsearchResultValue: React.Dispatch<React.SetStateAction<string>>;
  range: RangeItem[];
  setRange: React.Dispatch<React.SetStateAction<RangeItem[]>>;
  selectedOptions: {
    [key: string]: {
      [key: string]: string | Date[];
    };
  };
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<{
      [key: string]: {
        [key: string]: string | Date[];
      };
    }>
  >;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchedData: any[];
  setSearchedData: React.Dispatch<React.SetStateAction<any[]>>;
  SelectedData: string;
  setSelectedData: React.Dispatch<React.SetStateAction<string>>;
  SearchedValue: string;
  setSearchedValue: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProps {
  children: ReactNode;
}

interface RangeItem {
  startDate: Date;
  endDate: Date;
  key: string;
}

interface DateRange {
  startDate: Date;
  endDate: Date;
}
interface SelectedOptions {
  [key: string]: {
    [key: string]: string | { startDate: Date; endDate: Date };
  };
}
export const Authcontext = ({ children }: AuthContextProps) => {
  const [selectedsearchResultValue, setSelectedsearchResultValue] =
    useState<string>("all"); // default value
  const [range, setRange] = useState<RangeItem[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    all: { RiskScore: "none" },
    People: { RiskScore: "none", Classification: "none", Country: "none" },
    Groups: { RiskScore: "none", Classification: "none", Members: "none" },
    Messages: {
      RiskScore: "none",
      DateRange: { startDate: new Date(), endDate: new Date() },
    },
  });
  const [searchedData, setSearchedData] = useState<any[]>([]);
  const [SearchedValue, setSearchedValue] = useState<string>("");

  const [searchValue, setSearchValue] = useState<string>("");
  const [SelectedData, setSelectedData] = useState<string>("Advanced Sorting");

  return (
    <AuthContext.Provider
      value={
        {
          selectedsearchResultValue,
          setSelectedsearchResultValue,
          range,
          setRange,
          selectedOptions,
          setSelectedOptions,
          searchValue,
          setSearchValue,
          searchedData,
          setSearchedData,
          SelectedData,
          setSelectedData,
          SearchedValue,
          setSearchedValue,
        } as any
      }
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext more easily
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an Authcontext provider"
    );
  }
  return context;
};
