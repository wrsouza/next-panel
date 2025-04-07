import { useForm } from "react-hook-form";
import { ApiService } from "../services";
import { useRouter } from "next/navigation";

interface IAuth {
  email: string;
  password: string;
}

export function useAuth() {
  const api = new ApiService();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuth>();
  const router = useRouter();

  const onSubmit = async (data: IAuth) => {
    try {
      const res = await api.post("auth", data);
      console.log(res);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return {
    register,
    errors,
    onSubmit: handleSubmit(onSubmit),
  };
}
