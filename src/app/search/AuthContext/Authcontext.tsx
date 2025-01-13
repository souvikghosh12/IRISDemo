// src/app/search/AuthContext/Authcontext.tsx
"use client";

import { createContext, useState, ReactNode, useContext } from "react";

interface AuthContextType {
  selectedsearchResultValue: string;
  setSelectedsearchResultValue: React.Dispatch<React.SetStateAction<string>>;
  range: RangeItem[];
  setRange: React.Dispatch<React.SetStateAction<RangeItem[]>>;
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

  return (
    <AuthContext.Provider
    value={{
      selectedsearchResultValue,
      setSelectedsearchResultValue,
      range,
      setRange,
    } as any}
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
