import { useController } from "react-hook-form";

export const Select = ({
  name,
  label,
  options,
  placeholder,
  required,
  errors,
  disabled,
}) => {
  const { field } = useController({
    name,
    rules: {
      required,
    },
    disabled,
  });

  return (
    <div className="relative flex flex-col gap-2">
      <label htmlFor={name} className="md:text-base text-sm font-semibold">
        {label}
      </label>
      <select
        name={name}
        id={name}
        {...field}
        className="flex items-center p-2 border border-black rounded-md">
        <option value="" disabled selected>
          {placeholder}
        </option>
        {options?.map((option) => (
          <option
            key={option?.value}
            value={option?.value}
            className="text-black flex">
            {option?.name}
          </option>
        ))}
      </select>

      {errors && (
        <span className="text-red-500 md:text-sm text-xs font-medium ml-1">
          {errors.message}
        </span>
      )}
    </div>
  );
};
