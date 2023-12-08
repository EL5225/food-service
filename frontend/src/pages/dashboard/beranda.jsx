import { useEffect, useState } from "react";
import { Card, Search, SpyGlass } from "../../components";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { getAllResepPagination } from "../../utils";

export const Beranda = () => {
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [allResep, setAllResep] = useState([{}]);

  const search = async (e) => {
    e.preventDefault();
    if (e.target.value === "") {
      setAllResep([{}]);
      setSearchValue("");
    } else {
      setTimeout(() => {
        setSearchValue(e.target.value);
      }, 2000);
    }
  };

  const getDataResep = async (params) => {
    try {
      setLoading(false);
      const data = await getAllResepPagination({
        search: params,
      });
      setAllResep(data?.data);
      setLoading(true);
    } catch (error) {
      Promise.reject(error);
    }
  };

  useEffect(() => {
    getDataResep(searchValue);
  }, [searchValue]);

  return (
    <section className="flex flex-col w-full h-full py-12 lg:px-16 px-10 gap-14 overflow-auto">
      <div className="w-full flex items-center justify-between">
        <Search placeholder="Cari Nama masakan" onChange={search} />
        <Link to="/dashboard/profile">
          <FaUser className="text-3xl hover:text-gray-500 duration-200 ease-in-out" />
        </Link>
      </div>

      <div className="w-full flex flex-col gap-10">
        <h1
          className={`${
            searchValue ? "lg:text-4xl text-2xl" : "lg:text-5xl text-4xl"
          } font-semibold duration-200 ease-in-out`}>
          {searchValue ? (
            <span className="flex items-center gap-4">
              <SpyGlass />
              {searchValue}
            </span>
          ) : (
            <TypeAnimation
              sequence={[300, "Temukan resep terbaik!"]}
              wrapper="span"
              cursor={true}
            />
          )}
        </h1>

        {allResep?.length === 0 ? (
          <section className="bg-white py-20">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
              <div className="mx-auto max-w-screen-sm text-center">
                <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl ">
                  Resep tidak ada
                </p>
                <p className="mb-4 text-lg font-light text-zinc-600">
                  Maaf, resep yang kamu cari tidak ada
                </p>
              </div>
            </div>
          </section>
        ) : loading || allResep.length <= 0 ? (
          <div className="grid xl:grid-cols-4 md:grid-cols-2 justify-items-center gap-10">
            {allResep?.map((card, index) => (
              <Card
                key={index}
                id={card.id}
                image={card.resepImages?.[0]?.image_url}
                title={card.name}
                culture={card.culture}
                rating={card.averageRating}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center w-full h-[30rem] px-4 py-6 bg-gray-300 gap-3 rounded-lg shadow-md animate-pulse ease-out"></div>
        )}
      </div>
    </section>
  );
};
