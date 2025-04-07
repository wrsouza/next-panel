import { useCallback, useEffect, useState } from "react";
import { IUserCreate, IUserUpdate } from "../common";
import { ApiService } from "../services";

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
  const api = new ApiService();
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
  const [error, setError] = useState<string | null>(null);

  const getOne = async (id: string) => {
    return api.get<IUser>(`/users/${id}`);
  };

  const create = async (data: IUserCreate) => {
    return api.post<IUser>("/users", data);
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
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, [api]);

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await api.delete<void>(`/users/${id}`);
      // Refresh users list
      fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete user");
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
    error,
    fetchUsers,
    handleDelete,
  };
}
