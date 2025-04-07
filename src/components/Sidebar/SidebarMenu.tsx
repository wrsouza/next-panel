import { FC, ReactNode } from "react";

interface SidebarMenuProps {
  children: ReactNode;
}

export const SidebarMenu: FC<SidebarMenuProps> = ({ children }) => {
  return <nav className="p-4 space-y-1">{children}</nav>;
};
