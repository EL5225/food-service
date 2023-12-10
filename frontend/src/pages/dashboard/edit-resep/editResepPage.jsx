import { Suspense } from "react";
import { Spinner } from "../../../components";
import { EditResepContent } from "./content";
import { Await, useLoaderData } from "react-router-dom";

export const EditResepPage = () => {
  const { resep } = useLoaderData();

  return (
    <Suspense fallback={<Spinner />}>
      <Await resolve={resep} errorElement={<div>Error</div>}>
        <EditResepContent />
      </Await>
    </Suspense>
  );
};
