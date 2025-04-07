import { FC, ReactNode } from "react";

interface FormGroupProps {
  children: ReactNode;
}
export const FormGroup: FC<FormGroupProps> = ({ children }) => {
  return <div className="flex flex-row align-middle gap-3">{children}</div>;
};
