export const Button = (props) => {
  return (
    <button
      className="flex items-center justify-cente px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white font-semibold"
      onClick={props.onClick}>
      {props.children}
    </button>
  );
};
