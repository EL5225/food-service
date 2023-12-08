import { useState } from "react";
import { Card, Search, SpyGlass } from "../../components";

export const Beranda = () => {
  const [searchValue, setSearchValue] = useState("");
  const search = (e) => {
    setSearchValue(e.target.value);
  };
  const cardsData = [
    {
      image: "/food-landing.png",
      title: "Rendang",
      category: "Indonesia",
    },
    {
      image: "/food-landing.png",
      title: "Soto Lamongan",
      category: "Indonesia",
    },
    {
      image: "/food-landing.png",
      title: "Mie Kocok Bandung",
      category: "Indonesia",
    },
    {
      image: "/food-landing.png",
      title: "Nasi Goreng",
      category: "Indonesia",
    },
    {
      image: "/food-landing.png",
      title: "Pecel Lele",
      category: "Indonesia",
    },
    {
      image: "/food-landing.png",
      title: "Card Title",
      category: "Indonesia",
    },
    {
      image: "/food-landing.png",
      title: "Card Title",
      category: "Indonesia",
    },
    {
      image: "/food-landing.png",
      title: "Card Title",
      category: "Indonesia",
    },
  ];

  const filteredCards = cardsData.filter((card) => {
    return card.title.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <section className="flex flex-col w-full h-full py-12 px-16 gap-14 overflow-auto">
      <Search placeholder="Cari Nama masakan" onChange={search} />

      <div className="w-full flex flex-col gap-10">
        <h1
          className={`${
            searchValue ? "lg:text-4xl text-2xl" : "lg:text-6xl text-4xl"
          } font-semibold duration-200 ease-in-out`}>
          {searchValue ? (
            <span className="flex items-center gap-4">
              <SpyGlass />
              {searchValue}
            </span>
          ) : (
            "Temukan resep terbaik"
          )}
        </h1>

        <div className="grid xl:grid-cols-4 md:grid-cols-2 justify-items-center gap-10 duration-300">
          {filteredCards.map((card, index) => (
            <Card
              key={index}
              id={index + 1}
              image={card.image}
              title={card.title}
              category={card.category}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
