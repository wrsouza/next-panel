import { FC, ReactNode } from "react";

interface CardHeaderProps {
  children: ReactNode;
}

export const CardHeader: FC<CardHeaderProps> = ({ children }) => {
  return (
    <div className="flex gap-2 p-4 text-2xl font-extrabold text-gray-500 border-gray-200 border-b border-dashed">
      {children}
    </div>
  );
};
