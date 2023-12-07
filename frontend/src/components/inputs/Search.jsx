export const Search = ({ onChange, placeholder = "Search" }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="lg:w-[20rem] w-[14rem] lg:text-base text-sm p-2 appearance-none focus:outline-none border-b border-black"
      onChange={onChange}
    />
  );
};
