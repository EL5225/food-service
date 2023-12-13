import { FormProvider, useForm } from "react-hook-form";
import { Button, CardImage, Select, TextField } from "../../../components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAsyncValue, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useCreateResep } from "../../../utils";
import { VSCreateResep } from "../../../libs/validation";

export const CreateResepContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageURL, setImageUrl] = useState(null);
  const [imageCards, setImageCards] = useState([]);
  const { create, uploadImage } = useCreateResep();

  const form = useForm({
    mode: "all",
    resolver: zodResolver(VSCreateResep),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const categories = useAsyncValue();

  const navigate = useNavigate();

  const categoriesOptions = useMemo(() => {
    return categories?.data?.map((category) => {
      return {
        name: category?.name,
        value: category?.id,
      };
    });
  });

  const handleImage = (e) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    setImageCards([
      ...imageCards,
      {
        image_name: e.target.files[0].name,
        image_url: URL.createObjectURL(e.target.files[0]),
        image_size: e.target.files[0].size,
        file: e.target.files[0],
      },
    ]);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);

      await create({
        name: data.name,
        culture: data.culture,
        ingredients: data.ingredients,
        alternatifIngredient: data.alternatifIngredient,
        categories_id: Number(data.categories_id),
        history: data.history,
        description: data.description,
      }).then(async (res) => {
        imageCards.map(async (image) => {
          await uploadImage({
            resepId: res.resep.id,
            image_url: image.file,
          });
        });
      });

      setIsLoading(false);

      navigate("/dashboard");
    } catch (error) {
      setIsLoading(false);
      Promise.reject(error);
    }
  });

  return (
    <section className="flex flex-col w-full h-full lg:py-12 lg:px-12 pt-28 pb-12 px-6 gap-14 overflow-auto">
      <h1 className="text-3xl font-bold">Tambah Resep</h1>
      <div className="w-full flex lg:flex-row flex-col lg:gap-0 gap-16 items-center">
        <div className="w-[45%] flex flex-col gap-12">
          <figure className="lg:w-[85%] flex items-center justify-center">
            <img
              src={imageURL || "/imageupload.png"}
              alt="food-landing"
              width={"300px"}
              className="max-w-[350px] rounded-md"
            />
          </figure>

          <div className="flex flex-col items-center lg:w-[85%]">
            <label
              className="flex lg:w-[60%] items-center justify-center bg-black text-white p-4 text-base font-medium rounded-md cursor-pointer"
              htmlFor="image_url">
              Upload gambar
            </label>
            <input
              className="hidden"
              id="image_url"
              name="image_url"
              type="file"
              onChange={handleImage}
            />
          </div>

          <div className="lg:w-[85%] w-full lg:flex flex-col gap-3 justify-center hidden">
            {imageCards?.map((item, index) => (
              <CardImage
                key={index}
                name={item.image_name}
                image={item.image_url}
                size={item?.image_size}
                onClick={() => setImageUrl(item.image_url)}
                onDelete={async () => {
                  const inputFile = document.getElementById("image_url");
                  const newImage = imageCards.find((image) => {
                    return image.image_url === item.image_url;
                  });
                  setImageCards(
                    imageCards.filter((image) => {
                      return image.image_url !== newImage.image_url;
                    })
                  );
                  inputFile.value = null;
                }}
              />
            ))}
          </div>
        </div>

        <div className="lg:w-[85%] w-full flex flex-col gap-3 justify-center lg:hidden">
          {imageCards?.map((item, index) => (
            <CardImage
              key={index}
              name={item.image_name}
              image={item.image_url}
              size={item?.image_size}
              onClick={() => setImageUrl(item.image_url)}
              onDelete={async () => {
                const inputFile = document.getElementById("image_url");
                const newImage = imageCards.find((image) => {
                  return image.image_url === item.image_url;
                });
                setImageCards(
                  imageCards.filter((image) => {
                    return image.image_url !== newImage.image_url;
                  })
                );
                inputFile.value = null;
              }}
            />
          ))}
        </div>

        <FormProvider {...form}>
          <form
            onSubmit={onSubmit}
            className="lg:w-[45%] w-[90%] flex flex-col gap-4">
            <TextField
              name="name"
              label="Nama Masakan"
              placeholder="Contoh: Ayam Geprek"
              errors={errors.name}
            />
            <TextField
              name="culture"
              label="Asal negara / kebudayaan"
              placeholder="Contoh: Indonesia"
              errors={errors.culture}
            />
            <TextField
              name="ingredients"
              label="Bahan-bahan"
              placeholder="Contoh: Ayam, tepung, garam, merica"
              errors={errors.ingredients}
            />
            <TextField
              name="alternatifIngredient"
              label="Bahan alternatif"
              placeholder="Contoh: Bisa menggunakan ayam fillet atau sayap ayam"
              errors={errors.alternatifIngredient}
            />
            <Select
              label="Kategori"
              name="categories_id"
              placeholder="Pilih kategori"
              options={categoriesOptions || []}
              errors={errors.categories_id}
            />
            <TextField
              name="history"
              label="Sejarah singkat"
              placeholder="Contoh: Ayam geprek berasal dari Indonesia dan pertama kali muncul pada awal abad ke-21"
              isTextArea
              errors={errors.history}
            />
            <TextField
              name="description"
              label="Deskripsi / langkah-langkah"
              placeholder="setiap langkah pisahkan dengan titik, misal: 1) Goreng ayam. 2) Tumis bawang putih. 3) Tambahkan merica. Tekan Shift + Enter untuk pindah baris"
              isTextArea
              errors={errors.description}
            />
            <Button isLoading={isLoading}>Tambah</Button>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};
