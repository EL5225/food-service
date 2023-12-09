import { useAsyncValue } from "react-router-dom";

export const FavoritContent = () => {
  const savedResep = useAsyncValue();

  console.log(savedResep);

  return (
    <section>
      <h1>Favorit</h1>
    </section>
  );
};
