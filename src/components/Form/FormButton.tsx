import { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const FormButton: FC<FormButtonProps> = ({ children, ...rest }) => {
  return (
    <div className="flex align-middle justify-center">
      <button
        {...rest}
        className="flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none enabled:cursor-pointer"
      >
        {children}
      </button>
    </div>
  );
};
