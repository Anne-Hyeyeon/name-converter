"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { NameData } from "../types";
interface NameDataContextProps {
  nameData: NameData[] | null;
  setNameData: (data: NameData[]) => void;
}

const NameDataContext = createContext<NameDataContextProps | undefined>(
  undefined
);

export const NameDataProvider = ({ children }: { children: ReactNode }) => {
  const [nameData, setNameData] = useState<NameData[] | null>(null);

  return (
    <NameDataContext.Provider value={{ nameData, setNameData }}>
      {children}
    </NameDataContext.Provider>
  );
};

export const useNameData = () => {
  const context = useContext(NameDataContext);
  if (!context) {
    throw new Error("useNameData must be used within a NameDataProvider");
  }
  return context;
};
