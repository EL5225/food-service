import { useState } from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import { Button, Comment, CommentField } from "../../components";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Rating } from "@smastrom/react-rating";

export const Detail = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [userComment, setUserComment] = useState(null);

  const { id } = useLoaderData();

  console.log(id);

  const form = useForm({
    mode: "all",
    defaultValues: {
      komentar: "",
      rating: 0,
    },
  });

  const { handleSubmit, control } = form;

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShowComment = () => {
    setShowComment(true);
  };

  const comments = [
    {
      name: "Rama",
      content: "Enak Banget! Aku suka!",
      date: "2022-12-08",
      rating: 5,
    },
    {
      name: "Maya",
      content: "Rasanya aneh, tapi lumayan lah",
      date: "2023-12-08",
      rating: 3,
    },
    {
      name: "Rian",
      content: "Gk enak!",
      date: "2023-01-12",
      rating: 1,
    },
  ];

  const log = handleSubmit((data) => {
    console.log(data);
    setUserComment(data);
  });

  return (
    <section className="flex flex-col w-full h-full lg:px-12 px-4 py-16 gap-5 overflow-auto">
      {/* Card */}
      <div className="flex lg:flex-row flex-col h-auto items-center lg:justify-between gap-2 bg-slate-50 rounded-lg py-10 px-4 shadow-md">
        <figure>
          <img src="/food-landing.png" alt="" width={"400px"} />
        </figure>
        <div className="lg:w-[60%] w-full h-full flex flex-col lg:p-12 gap-8">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-1">
              <h1 className="lg:text-3xl text-xl font-semibold">
                Ayam Resepku
              </h1>
              <span className="relative lg:text-sm text-xs font-semibold opacity-60 bottom-2.5">
                Indonesia
              </span>
            </div>

            <div className="flex gap-2 items-center">
              <span className="lg:text-2xl text-xl font-semibold">4.5</span>
              <FaStar className="text-[#ffc800] lg:text-2xl text-xl" />
            </div>
          </div>
          <h2 className="font-semibold p-2 w-fit rounded-md bg-red-300 lg:text-base text-sm">
            Olahan Daging
          </h2>
          <p>
            Bahan Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequatur, possimus?
          </p>
          <p>
            Bahan alternatif Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Eius, nisi?
          </p>

          <div className="relative flex w-full items-center lg:justify-end justify-center lg:top-14">
            <button
              onClick={handleFavorite}
              className="w-auto, h-auto flex items-center hover:scale-110 duration-300 active:scale-95">
              {isFavorite ? (
                <FaHeart className="text-4xl text-[#e71b1b]" />
              ) : (
                <FaRegHeart className="text-4xl text-[#e71b1b]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Comment user */}

      {!userComment && (
        <div className="w-full py-4 flex flex-col">
          {showComment ? (
            <FormProvider {...form}>
              <form
                onSubmit={log}
                className="w-full flex flex-col items-center gap-6">
                <h1 className="text-xl font-semibold">
                  Beri Rating dan ulasanmu!
                </h1>
                <Controller
                  control={control}
                  name="rating"
                  rules={{
                    validate: (rating) => rating > 0,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Rating
                      style={{ maxWidth: 180 }}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  )}
                />
                <CommentField placeholder="Beri komentar (opsional)" />
                <Button>Kirim</Button>
              </form>
            </FormProvider>
          ) : (
            <Button onClick={handleShowComment} width="w-[20rem]">
              Beri Ulasan
            </Button>
          )}
        </div>
      )}

      {/* Comment user */}

      {/* Comment section */}

      <div className="w-full py-4 flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">Rating & Ulasan</h1>
        <div className="flex flex-col w-full gap-6">
          {userComment && (
            <Comment name="user" value={userComment.rating} date={"2023-12-07"}>
              {userComment.komentar}
            </Comment>
          )}
          {comments.map((comment, index) => (
            <Comment
              key={index}
              name={comment.name}
              date={comment.date}
              value={comment.rating}>
              {comment.content}
            </Comment>
          ))}
        </div>
      </div>
    </section>
  );
};
