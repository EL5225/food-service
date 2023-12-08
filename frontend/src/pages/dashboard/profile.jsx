import { useEffect, useMemo, useState } from "react";
import { useUpdateAvatar, useUpdateUser, useUserData } from "../../utils";
import { FormProvider, useForm } from "react-hook-form";
import { Button, TextField } from "../../components";
import { MdEdit } from "react-icons/md";

export const Profile = () => {
  const { getUserData } = useUserData();

  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAvatarEditing, setIsAvatarEditing] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const { updateAvatar } = useUpdateAvatar();
  const { updateUser } = useUpdateUser();

  const form = useForm({
    mode: "all",
    defaultValues: {
      image_url: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const user = useMemo(() => {
    return getUserData;
  }, [getUserData]);

  const handleEditing = (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
    setIsAvatarEditing(null);
    setIsLoading(false);
    reset({
      username: user?.username,
      email: user?.email,
    });
  };

  const submit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      data.image_url = avatar;

      await updateAvatar(data.image_url);

      await updateUser({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      setIsLoading(false);
      setIsEditing(false);
    } catch (error) {
      setIsLoading(false);
      Promise.reject(error);
    }
  });

  useEffect(() => {
    reset({
      username: user?.username,
      email: user?.email,
    });
  }, [user]);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={submit}
        className="w-full h-full flex flex-col items-center border-2 gap-8 lg:px-20 lg:py-16 py-14 overflow-auto">
        <h1 className="lg:w-[45%] w-full flex items-center justify-center p-2 text-4xl font-bold border-2 rounded-sm bg-black text-white">
          {isEditing ? "Edit Profile" : "Profile"}
        </h1>
        {!user ? (
          <figure>
            <div className="rounded-full w-[200px] h-[200px] bg-gray-400 animate-pulse" />
          </figure>
        ) : (
          <figure className="relative">
            <img
              src={isAvatarEditing ? isAvatarEditing : user?.avatar}
              alt="food-landing"
              width={"200px"}
              className="rounded-full"
            />
            {isEditing && (
              <div className="flex absolute right-3 bottom-0">
                <input
                  id="avatar"
                  name="image_url"
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    setAvatar(e.target.files[0]);
                    setIsAvatarEditing(URL.createObjectURL(e.target.files[0]));
                  }}
                />
                <label
                  htmlFor="avatar"
                  className="flex items-center justify-center p-3 rounded-full bg-slate-50 cursor-pointer">
                  <MdEdit className="text-2xl" />
                </label>
              </div>
            )}
          </figure>
        )}

        <div className="lg:w-[45%] w-full flex flex-col gap-6 lg:px-0 px-10">
          <TextField
            name="username"
            label="Nama"
            disabled={!isEditing}
            errors={errors.name}
          />
          <TextField
            name="email"
            label="Email"
            disabled={!isEditing}
            errors={errors.email}
          />
          {isEditing && (
            <TextField
              name="password"
              label="Password"
              type="password"
              disabled={!isEditing}
              errors={errors.password}
            />
          )}
        </div>

        {isEditing ? (
          <div className="lg:w-[45%] w-[90%] flex justify-between">
            <Button onClick={handleEditing} width="w-[45%] mt-12">
              Batal
            </Button>
            <Button isLoading={isLoading} type="submit" width="w-[45%] mt-12">
              Simpan
            </Button>
          </div>
        ) : (
          <Button onClick={handleEditing} width="lg:w-[45%] w-[90%] mt-12">
            Edit Profile
          </Button>
        )}
      </form>
    </FormProvider>
  );
};
