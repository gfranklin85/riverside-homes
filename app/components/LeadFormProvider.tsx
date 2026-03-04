"use client";

import { createContext, useContext, useState, useCallback } from "react";
import LeadFormModal from "./LeadFormModal";

type LeadFormContextType = {
  openForm: (source?: string) => void;
};

const LeadFormContext = createContext<LeadFormContextType>({
  openForm: () => {},
});

export function useLeadForm() {
  return useContext(LeadFormContext);
}

export default function LeadFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("unknown");

  const openForm = useCallback((source: string = "unknown") => {
    setSource(source);
    setIsOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <LeadFormContext value={{ openForm }}>
      {children}
      <LeadFormModal open={isOpen} onClose={closeForm} source={source} />
    </LeadFormContext>
  );
}
