import { Spinner } from "./spinner";

export const Loading = ({ backgroundColor, color }) => {
  return (
    <div
      className={`w-full h-screen flex justify-center items-center ${backgroundColor}`}>
      <Spinner color={color} />
    </div>
  );
};
