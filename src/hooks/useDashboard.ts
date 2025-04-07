import { AiOutlineHome, AiOutlineTeam } from "react-icons/ai";
import { MdOutlineAdminPanelSettings, MdOutlineSecurity } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { IAuthUser } from "../contexts";

export const useDashboard = () => {
  const hasPermission = (user: null | IAuthUser, permission?: string) => {
    if (!permission) return true;
    if (user?.admin) return true;
    return user?.roles?.includes(permission);
  };

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: AiOutlineHome,
    },
    {
      name: "Users",
      href: "/users",
      icon: AiOutlineTeam,
      permission: "users:list",
    },
    {
      name: "Roles",
      href: "/roles",
      icon: MdOutlineSecurity,
      permission: "roles:list",
    },
    {
      name: "Permissions",
      href: "/permissions",
      icon: MdOutlineAdminPanelSettings,
      permission: "permissions:list",
    },
    {
      name: "Logout",
      href: "/logout",
      icon: IoLogOutOutline,
    },
  ];

  return {
    menuItems,
    hasPermission,
  };
};
