import { FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";

export const AuthLayout = ({
  children,
  title,
  onSubmit,
  form,
  width = "xl:w-[30rem] md:w-[65%] w-[70%] ",
  noForm = false,
}) => {
  return (
    <main className="w-full h-screen flex items-center">
      <div className="lg:w-[60%] w-full h-full flex flex-col justify-center items-center bg-[#9EC8B9]">
        <div className={`flex flex-col gap-6 ${width} p-4`}>
          <h1 className="md:text-3xl text-2xl font-bold text-[#1B4242]">
            {title}
          </h1>
          {!noForm ? (
            <FormProvider {...form}>
              <form className="flex flex-col gap-5" onSubmit={onSubmit}>
                {children}
              </form>
            </FormProvider>
          ) : (
            <div className="flex flex-col gap-5">{children}</div>
          )}
        </div>
      </div>
      <div className="lg:flex hidden w-[40%] h-full justify-center items-center bg-[#1B4242]">
        <Link to="/">
          <figure className="w-full flex justify-center items-center">
            <img src="/resepku-new.png" alt="resepku-icon" />
          </figure>
        </Link>
      </div>
    </main>
  );
};
