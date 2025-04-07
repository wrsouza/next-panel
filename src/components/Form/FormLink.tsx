import Link from "next/link";
import { FC, ReactNode } from "react";

interface FormLinkProps {
  children: ReactNode;
  href: string;
}

export const FormLink: FC<FormLinkProps> = ({ children, href }) => {
  return (
    <div className="flex align-middle justify-center">
      <Link
        href={href}
        className="flex justify-center py-2 px-4 text-sm font-medium rounded-md text-gray-400 hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
      >
        {children}
      </Link>
    </div>
  );
};
