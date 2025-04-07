"use client";
import { FC, ReactNode } from "react";
import { Sidebar } from "../../components";
import { useDashboard } from "../../hooks";
import { useAuthContext } from "../../contexts";
import { usePathname } from "next/navigation";

type DashboardLayoutProps = {
  children: ReactNode;
};

export const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const { user } = useAuthContext();
  const { hasPermission, menuItems } = useDashboard();

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar.Root>
        <Sidebar.Header email={user?.email} admin={user?.admin}>
          Dashboard
        </Sidebar.Header>
        <Sidebar.Menu>
          {menuItems
            .filter((item) => hasPermission(user, item.permission))
            .map((item) => (
              <Sidebar.MenuItem
                key={item.name}
                {...item}
                active={pathname === item.href}
              />
            ))}
        </Sidebar.Menu>
      </Sidebar.Root>
      <main className="flex-1">
        <div className="py-6 px-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
};
