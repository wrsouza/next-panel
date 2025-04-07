"use client";
import { FC, useEffect } from "react";
import { useAuthContext } from "../../../contexts";

const Logout: FC = () => {
  const { logout } = useAuthContext();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div>
      <h1>Redirect...</h1>
    </div>
  );
};

export default Logout;
