import { Button } from "../components";

export const Home = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between w-full items-center px-14 md:py-0 py-12 md:gap-0 gap-4 bg-[#9EC8B9]">
      <figure className="md:hidden block">
        <img src="/food-landing.png" alt="food-landing" width={"300px"} />
      </figure>

      <div className="flex flex-col items-center justify-center md:w-[40%] gap-20">
        <h1 className="lg:text-5xl text-4xl font-bold text-slate-100">
          Dapatkan banyak resep masakan secara online dengan Resepku
        </h1>
        <Button href={"/register"}>Daftar Sekarang!</Button>
      </div>

      <figure className="w-[40%] hidden md:block">
        <img src="/food-landing.png" alt="food-landing" />
      </figure>
    </div>
  );
};
