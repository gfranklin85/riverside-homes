"use client";

import { useLeadForm } from "./LeadFormProvider";

type CTAButtonProps = {
  source?: string;
  children: React.ReactNode;
  className?: string;
};

export default function CTAButton({
  source = "unknown",
  children,
  className,
}: CTAButtonProps) {
  const { openForm } = useLeadForm();

  return (
    <button onClick={() => openForm(source)} className={className}>
      {children}
    </button>
  );
}
