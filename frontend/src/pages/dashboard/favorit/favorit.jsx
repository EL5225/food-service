import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { FavoritContent } from "./favoritContent";
import { Spinner } from "../../../components";

export const FavoritPage = () => {
  const { saved } = useLoaderData();

  return (
    <Suspense fallback={<Spinner />}>
      <Await resolve={saved} errorElement={<div>Error</div>}>
        <FavoritContent />
      </Await>
    </Suspense>
  );
};
