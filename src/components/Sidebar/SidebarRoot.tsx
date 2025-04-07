"use client";

import { FC, ReactNode } from "react";

interface SidebarRootProps {
  children: ReactNode;
}

export const SidebarRoot: FC<SidebarRootProps> = ({ children }) => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 shadow-sm">
      {children}
    </aside>
  );
};
