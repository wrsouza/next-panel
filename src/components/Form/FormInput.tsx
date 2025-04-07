import { FC, InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  errors: {
    [key: string]: {
      message?: string;
    };
  };
}

export const FormInput: FC<FormInputProps> = ({
  label,
  name,
  errors,
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm opacity-50">
        {label}
      </label>
      <input
        name={name}
        className="rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        {...rest}
      />
      {errors[name]?.message ? (
        <span className="block text-red-700 sm:inline">
          {errors[name].message}
        </span>
      ) : null}
    </div>
  );
};
