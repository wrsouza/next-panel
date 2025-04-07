import { FC, ReactNode } from "react";

interface SidebarHeaderProps {
  children: ReactNode;
  email?: string;
  admin?: boolean;
}

export const SidebarHeader: FC<SidebarHeaderProps> = ({
  children,
  email,
  admin,
}) => {
  return (
    <div className="p-6 border-b border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800">{children}</h2>
      <div className="mt-2 flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white font-medium">
            {email?.charAt(0)?.toUpperCase() || "U"}
          </span>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{email}</p>
          <p className="text-xs text-gray-500">
            {admin ? "Administrator" : "User"}
          </p>
        </div>
      </div>
    </div>
  );
};
