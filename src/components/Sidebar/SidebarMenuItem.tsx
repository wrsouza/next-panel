import Link from "next/link";
import { createElement, FC } from "react";
import { IconType } from "react-icons/lib";

interface SidebarMenuItemProps {
  name: string;
  href: string;
  icon: IconType;
  active: boolean;
}

export const SidebarMenuItem: FC<SidebarMenuItemProps> = ({
  name,
  href,
  icon,
  active,
}) => {
  return (
    <Link
      key={name}
      href={href}
      className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-150 ${
        active
          ? "bg-blue-50 text-blue-600"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <span className={`mr-3 ${active ? "text-blue-600" : ""}`}>
        <span className="w-5 h-5">{icon && createElement(icon)}</span>
      </span>
      <span className="font-medium">{name}</span>
    </Link>
  );
};
