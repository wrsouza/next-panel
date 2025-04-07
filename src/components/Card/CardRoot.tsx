import { FC, ReactNode } from "react";

interface CardRootProps {
  children: ReactNode;
}

export const CardRoot: FC<CardRootProps> = ({ children }) => {
  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-md">
      {children}
    </div>
  );
};
