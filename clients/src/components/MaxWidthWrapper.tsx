"use client"
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "w-auto h-auto mx-auto max-w-screen-2xl px-3.5 md:px-8",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
