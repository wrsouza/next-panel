import { FC, ReactNode } from "react";

interface CardBodyProps {
  children: ReactNode;
}

export const CardBody: FC<CardBodyProps> = ({ children }) => {
  return <div className="flex flex-col gap-2 p-4">{children}</div>;
};
