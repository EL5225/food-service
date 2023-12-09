import { useEffect, useMemo, useState } from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import {
  Button,
  Comment,
  CommentField,
  RatingDisplay,
} from "../../../components";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Rating } from "@smastrom/react-rating";
import { useAsyncValue } from "react-router-dom";
import {
  handleDate,
  handleTime,
  useCreateReviews,
  useSaveResep,
  useUserData,
} from "../../../utils";

export const DetailContent = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [userComment, setUserComment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { getUserData } = useUserData();

  const dataResep = useAsyncValue();

  const user = useMemo(() => {
    return getUserData;
  }, [getUserData]);

  const resep = useMemo(() => {
    return dataResep?.data?.[0];
  }, [dataResep?.data?.[0]]);

  const reviews = useMemo(() => {
    const filteredReviews = resep?.reviews?.filter((review) => {
      return review?.user?.id !== user?.id;
    });

    return filteredReviews?.sort((a, b) => {
      return handleTime(a?.createdAt) - handleTime(b?.createdAt);
    });
  });

  const form = useForm({
    mode: "all",
    defaultValues: {
      komentar: "",
      rating: 0,
    },
  });

  const { handleSubmit, control } = form;

  const { createReviews } = useCreateReviews();
  const { saveResep } = useSaveResep();

  const handleFavorite = async () => {
    try {
      setIsFavorite(!isFavorite);
      await saveResep({
        resepId: resep?.id,
      });
    } catch (error) {
      Promise.reject(error);
    }
  };

  const handleShowComment = () => {
    setShowComment(true);
  };

  const resepData = [
    {
      title: "Bahan",
      content: resep?.ingredients,
    },
    {
      title: "Bahan Alternatif",
      content: resep?.alternatifIngredient,
    },
  ];

  const curentRatings = [
    { star: 5, value: resep?.current_rating_five },
    { star: 4, value: resep?.current_rating_four },
    { star: 3, value: resep?.current_rating_three },
    { star: 2, value: resep?.current_rating_two },
    { star: 1, value: resep?.current_rating_one },
  ];

  const log = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      await createReviews(resep?.id, {
        rating: data?.rating,
        description: data?.komentar,
      });

      setUserComment({
        user: {
          id: user?.id,
          avatar: user?.avatar,
          username: user?.username,
        },
        createdAt: handleDate(),
        rating: data?.rating,
        description: data?.komentar,
      });
      setIsLoading(false);
    } catch (error) {
      Promise.reject(error);
    }
  });

  useEffect(() => {
    const reviewedUser = resep?.reviews?.find((review) => {
      return review?.user?.id === user?.id;
    });
    if (reviewedUser) {
      setUserComment(reviewedUser);
    }
  }, [resep?.reviews]);

  return (
    <section className="flex flex-col w-full h-full lg:px-12 px-4 lg:py-16 pt-28 pb-12  gap-5 overflow-auto">
      {/* Card */}
      <div className="flex lg:flex-row flex-col h-auto items-center lg:justify-between gap-2 bg-slate-50 rounded-lg pt-4 lg:pb-12 pb-4 px-6 shadow-md">
        <figure className="relative lg:left-4">
          <img
            src={resep?.resepImages?.[0]?.image_url}
            alt=""
            width={"400px"}
            className="rounded-lg"
          />
        </figure>
        <div className="lg:w-[60%] w-full h-full flex flex-col lg:pl-12 lg:py-12 lg:pr-6 py-8 gap-8">
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col gap-1 w-[60%]">
              <h1 className="lg:text-3xl text-xl font-semibold">
                {resep?.name}
              </h1>
              <span className="relative lg:text-sm text-xs font-semibold opacity-60">
                {resep?.culture}
              </span>
            </div>

            <div className="flex gap-2 items-center">
              <span className="lg:text-2xl text-xl font-semibold">
                {resep?.averageRating}
              </span>
              <FaStar className="text-[#ffc800] lg:text-2xl text-xl" />
            </div>
          </div>
          <h2 className="font-semibold p-2 w-fit rounded-md bg-red-300 lg:text-base text-sm">
            {resep?.categories?.name}
          </h2>
          <div className="flex flex-col gap-4">
            {/* Bahan */}
            <div className="flex flex-col gap-4">
              {resepData.map((data, index) => (
                <div key={index}>
                  <span className="font-bold">{data.title}</span>
                  <p>{data.content}</p>
                </div>
              ))}
            </div>
            {/* Deskripsi */}
            <div className="flex flex-col gap-3">
              <p>{resep?.history}</p>
              <p>{resep?.description}</p>
            </div>
          </div>

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

      {/* Average Rating */}
      <RatingDisplay rating={curentRatings} average={resep?.averageRating} />

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
                <Button isLoading={isLoading}>Kirim</Button>
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
            <Comment
              image={userComment?.user?.avatar}
              name={userComment?.user?.username}
              date={userComment?.createdAt}
              value={userComment.rating}>
              {userComment.description}
            </Comment>
          )}
          {reviews?.map((comment, index) => (
            <Comment
              key={index}
              image={comment.user.avatar}
              name={comment.user.username}
              date={comment.createdAt}
              value={comment.rating}>
              {comment.description}
            </Comment>
          ))}
        </div>
      </div>
    </section>
  );
};
