import { Suspense } from "react";
import { Spinner } from "../../../components";
import { CreateResepContent } from "./content";
import { Await, useLoaderData } from "react-router-dom";

export const CreateResepPage = () => {
  const { category } = useLoaderData();

  return (
    <Suspense fallback={<Spinner />}>
      <Await resolve={category} errorElement={<div>Error</div>}>
        <CreateResepContent />
      </Await>
    </Suspense>
  );
};
