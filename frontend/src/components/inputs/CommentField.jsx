import { useController } from "react-hook-form";

export const CommentField = ({
  name = "komentar",
  placeholder,
  required,

  errors,
}) => {
  const { field } = useController({
    name,
    rules: {
      required,
    },
  });

  return (
    <div className="w-full relative flex flex-col gap-1">
      <textarea
        id="komentar"
        placeholder={placeholder}
        {...field}
        className="border border-gray-500 md:py-2 py-1 px-4 text-base text-black rounded-md"
      />

      {errors && (
        <span className="text-red-500 md:text-sm text-xs font-medium ml-1">
          {errors.message}
        </span>
      )}
    </div>
  );
};
