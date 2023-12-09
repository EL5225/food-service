import { Suspense } from "react";
import { Spinner } from "../../../components";
import { DetailContent } from "./detailContent";
import { Await, useLoaderData } from "react-router-dom";

export const DetailPage = () => {
  const { resep } = useLoaderData();

  return (
    <Suspense fallback={<Spinner />}>
      <Await resolve={resep} errorElement={<div>Error</div>}>
        <DetailContent />
      </Await>
    </Suspense>
  );
};
