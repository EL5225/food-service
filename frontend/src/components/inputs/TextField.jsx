import { useState } from "react";
import { useController } from "react-hook-form";
import { EyeOpen, EyeSlash } from "../icons";

export const TextField = ({
  name,
  label,
  placeholder,
  required,
  type = "text",
  errors,
  disabled,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { field } = useController({
    name,
    rules: {
      required,
    },
    disabled,
  });

  const tooglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative flex flex-col gap-1">
      <label className="md:text-base text-sm font-semibold" htmlFor={name}>
        {label}
      </label>
      <input
        type={type === "password" ? (!showPassword ? type : "text") : type}
        id={name}
        placeholder={placeholder}
        {...field}
        className="border border-gray-500 md:py-2 py-1 px-4 text-base text-black rounded-md"
      />
      {type === "password" && (
        <button
          className="absolute flex items-center justify-center right-3 md:top-[2.6rem] top-[2.1rem]"
          onClick={tooglePassword}>
          {type === "password" && !showPassword ? <EyeSlash /> : <EyeOpen />}
        </button>
      )}

      {errors && (
        <span className="text-red-500 md:text-sm text-xs font-medium ml-1">
          {errors.message}
        </span>
      )}
    </div>
  );
};
