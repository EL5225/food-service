import { FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";

export const AuthLayout = ({ children, title, onSubmit, form }) => {
  return (
    <main className="w-full h-screen flex items-center">
      <div className="lg:w-[60%] w-full h-full flex flex-col justify-center items-center bg-slate-50">
        <div className="flex flex-col gap-6 xl:w-[30rem] md:w-[65%] w-[70%] p-4">
          <h1 className="md:text-3xl text-2xl font-bold">{title}</h1>
          <FormProvider {...form}>
            <form className="flex flex-col gap-5" onSubmit={onSubmit}>
              {children}
            </form>
          </FormProvider>
        </div>
      </div>
      <div className="lg:flex hidden w-[40%] h-full justify-center items-center bg-black">
        <Link to="/">
          <figure className="w-full flex justify-center items-center">
            <img src="/resepku-black.png" alt="resepku-icon" />
          </figure>
        </Link>
      </div>
    </main>
  );
};
