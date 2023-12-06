import { Link, useNavigate } from "react-router-dom";
import { Button, TextField } from "../components";
import { AuthLayout } from "../layouts/AuthLayout";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VSLogin } from "../libs";
import { useLogin } from "../utils/hooks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setToken } from "../utils/token";

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(VSLogin),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const navigate = useNavigate();

  const { login } = useLogin();

  const log = handleSubmit(async (data) => {
    try {
      setIsLoading(true);

      const res = await login(data);
      const token = await res.data.token;

      setToken(token);
      setIsLoading(false);

      navigate("/");
    } catch (error) {
      setIsLoading(false);

      toast.error("Daftar Akun Gagal", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      console.log(error);
    }
  });

  return (
    <AuthLayout title="Masuk" form={form} onSubmit={log}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <TextField name="email" label="Email" errors={errors.email} />
      <TextField
        type="password"
        name="password"
        label="Password"
        errors={errors.password}
      />

      <Button isLoading={isLoading}>Masuk</Button>
      <div className="flex items-center justify-center font-medium mt-5 md:text-base text-sm">
        <p>
          Belum Punya Akun?{" "}
          <Link className="underline hover:text-zinc-700" to="/register">
            Daftar
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};
