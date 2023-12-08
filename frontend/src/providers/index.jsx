import { RecoilRoot } from "recoil";

export const RecoilProvider = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};
