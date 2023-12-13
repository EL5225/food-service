import { useEffect, useMemo, useState } from "react";
import { FaHeart, FaRegHeart, FaStar, FaTrashAlt } from "react-icons/fa";
import {
  Button,
  Comment,
  CommentField,
  RatingDisplay,
  Spinner,
} from "../../../components";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Rating } from "@smastrom/react-rating";
import { useAsyncValue, useNavigate } from "react-router-dom";
import {
  getUserRole,
  handleDate,
  handleTime,
  useCreateReviews,
  useDeleteResep,
  useSaveResep,
  useUserData,
} from "../../../utils";

export const DetailContent = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [userComment, setUserComment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [image, setImage] = useState(null);

  const { getUserData } = useUserData();

  const dataResep = useAsyncValue();

  const { deleteImage, deleteResep } = useDeleteResep();

  const role = getUserRole();
  const navigate = useNavigate();

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

  const steps = useMemo(() => {
    return resep?.description?.split("\n");
  });

  const form = useForm({
    mode: "all",
    defaultValues: {
      komentar: "",
      rating: 0,
    },
  });

  const [favoritState, setFavoritState] = useState(resep?.saved_recipe);

  const { handleSubmit, control } = form;

  const { createReviews } = useCreateReviews();
  const { saveResep } = useSaveResep();

  const handleFavorite = async () => {
    try {
      setIsFavorite(!isFavorite);

      const res = await saveResep({
        resepId: resep?.id,
      });

      if (res?.isSaved) {
        setFavoritState((prev) => prev + 1);
      } else {
        setFavoritState((prev) => prev - 1);
        console.log(favoritState);
      }
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

  const handleDelete = async () => {
    try {
      setIsLoadingDelete(true);
      await deleteResep(resep?.id);
      if (resep?.resepImages?.[0]?.id) {
        await deleteImage(resep?.id, resep?.resepImages?.[0]?.id);
      }
      setIsLoadingDelete(false);
      navigate("/dashboard");
    } catch (error) {
      Promise.reject(error);
    }
  };

  useEffect(() => {
    const reviewedUser = resep?.reviews?.find((review) => {
      return review?.user?.id === user?.id;
    });
    if (reviewedUser) {
      setUserComment(reviewedUser);
    }
  }, [resep?.reviews]);

  useEffect(() => {
    const savedUser = resep?.savedRecipes?.find((save) => {
      return save?.user?.id === user?.id;
    });
    if (savedUser) {
      setIsFavorite(true);
    }
  }, [resep?.savedRecipes]);

  return (
    <section className="flex flex-col w-full h-full lg:px-12 px-4 lg:py-16 pt-28 pb-12  gap-5 overflow-auto overflow-x-hidden">
      {/* Card */}
      <div className="flex lg:flex-row flex-col h-auto lg:items-start items-center lg:justify-between gap-2 bg-[#F3F3F3] rounded-lg pt-4 lg:pb-12 pb-4 px-6 shadow-md">
        <div className="relative flex flex-col items-center gap-1 lg:left-4 lg:mt-14 lg:ml-1">
          <figure>
            <img
              src={image || resep?.resepImages?.[0]?.image_url}
              alt=""
              width={"400px"}
              className="rounded-lg lg:min-h-[400px] lg:max-w-[400px] max-w-[300px] min-h-[300px]"
            />
          </figure>
          <div className="lg:w-full lg:relative grid grid-cols-4 justify-items-center gap-2 p-2">
            {resep?.resepImages?.map((image, index) => {
              return (
                <button key={index} onClick={() => setImage(image?.image_url)}>
                  <img
                    src={image?.image_url}
                    alt={"image"}
                    width={"80px"}
                    className="rounded-lg lg:min-h-[80px] lg:max-w-[80px] max-w-[60px] min-h-[60px] border"
                  />
                </button>
              );
            })}
          </div>
        </div>
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
            <div className="flex flex-col gap-1">
              <p className="font-bold">Sejarah singkat</p>
              <p className="font-semibold">{resep?.history}</p>
            </div>
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
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p className="font-bold">Cara Membuat</p>
                <ul className="flex flex-col gap-2">
                  {steps?.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="relative flex w-full items-center lg:justify-end justify-center lg:top-14">
            {role === "user" ? (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-2">
                  <button
                    onClick={handleFavorite}
                    className="w-auto, h-auto flex items-center hover:scale-110 duration-300 active:scale-95">
                    {isFavorite ? (
                      <FaHeart className="text-4xl text-[#e71b1b]" />
                    ) : (
                      <FaRegHeart className="text-4xl text-[#e71b1b]" />
                    )}
                  </button>
                  <span className="text-lg font-medium">
                    {favoritState <= 0
                      ? 0
                      : favoritState || resep?.saved_recipe}
                  </span>
                </div>
              </div>
            ) : (
              <button
                className="w-auto, h-auto flex items-center hover:scale-110 duration-300 active:scale-95"
                onClick={handleDelete}>
                {isLoadingDelete ? (
                  <Spinner
                    width="w-9"
                    height="h-9"
                    color="fill-[#e71b1b] text-red-300"
                  />
                ) : (
                  <FaTrashAlt className="text-4xl text-[#e71b1b]" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Average Rating */}
      <RatingDisplay rating={curentRatings} average={resep?.averageRating} />

      {/* Comment user */}

      {!userComment && role === "user" && (
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

      {role === "admin" && (
        <Button href={`/dashboard/editresep/${resep?.id}`} width="w-[20rem]">
          Edit Resep
        </Button>
      )}

      {/* Comment user */}

      {/* Comment section */}

      <div className="w-full py-6 flex flex-col gap-5">
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
