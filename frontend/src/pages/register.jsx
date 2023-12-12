import { ToastContainer, toast } from "react-toastify";
import { Button, TextField } from "../components";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "../layouts/AuthLayout";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { VSRegister } from "../libs";
import { useRegister } from "../utils";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(VSRegister),
  });

  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const { register } = useRegister();

  const log = handleSubmit(async (data) => {
    try {
      setIsLoading(true);

      await register(data);

      setIsLoading(false);

      toast.success("Daftar Akun Berhasil", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      navigate(`/verify-otp?email=${data.email}`);
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
    <AuthLayout title="Daftar" form={form} onSubmit={log}>
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
      <TextField name="name" label="Nama" errors={errors.name} />
      <TextField name="email" label="Email" errors={errors.email} />
      <TextField
        type="password"
        name="password"
        label="Password"
        errors={errors.password}
      />

      <Button isLoading={isLoading}>Daftar</Button>
      <div className="flex items-center justify-center font-medium mt-5 md:text-base text-sm">
        <p>
          Sudah Punya Akun?{" "}
          <Link className="underline hover:text-zinc-700" to="/login">
            Masuk
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};
