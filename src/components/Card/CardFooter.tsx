import { FC, ReactNode } from "react";

interface CardFooterProps {
  children: ReactNode;
}

export const CardFooter: FC<CardFooterProps> = ({ children }) => {
  return (
    <div className="flex flex-row items-center gap-2 px-4 py-3 border-gray-200 border-t border-dashed text-sm font-medium">
      {children}
    </div>
  );
};
