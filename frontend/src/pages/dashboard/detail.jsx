import { useLoaderData } from "react-router-dom";

export const Detail = () => {
  const { id } = useLoaderData();
  console.log(id);

  return <h1>Detail</h1>;
};
