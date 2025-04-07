import { useCallback, useEffect, useMemo, useState } from "react";
import { IUserCreate, IUserUpdate } from "../common";
import { ApiService } from "../services";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface IUser {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  roles: string[];
}

interface IUserPaginate {
  search: string;
  page: number;
  tpages: number;
  rows: number;
  sort: string;
  total: number;
  data: IUser[];
}

export function useUsers() {
  const api = useMemo(() => new ApiService(), []);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserCreate>();
  const [users, setUsers] = useState<IUserPaginate>({
    search: "",
    page: 1,
    tpages: 0,
    rows: 10,
    sort: "createdAt:asc",
    total: 0,
    data: [],
  });
  const [loading, setLoading] = useState(true);

  const getOne = async (id: string) => {
    return api.get<IUser>(`/users/${id}`);
  };

  const createUser = async (data: IUserCreate) => {
    try {
      await api.post<IUser>("/users", data);
      router.push("/users");
    } catch (err) {
      console.error(err);
    }
  };

  const update = async (id: string, data: IUserUpdate) => {
    return api.put<IUser>(`/users/${id}`, data);
  };

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.get<IUserPaginate>("users");
      console.log(data);
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [api]);

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await api.delete<void>(`/users/${id}`);
      // Refresh users list
      await fetchUsers();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    register,
    handleSubmit,
    errors,
    fetchUsers,
    handleDelete,
    createUser,
  };
}
