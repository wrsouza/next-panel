import { FC, InputHTMLAttributes, ReactNode } from "react";

interface FormRootProps extends InputHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

export const FormRoot: FC<FormRootProps> = ({ children, ...rest }) => {
  return (
    <form {...rest}>
      <div className="flex flex-col gap-3">{children}</div>
    </form>
  );
};
