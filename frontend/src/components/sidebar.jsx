import { useEffect, useMemo } from "react";
import { Heart, House, Logout } from "./icons";
import {
  getUserMe,
  getUserRole,
  removeToken,
  useAvatar,
  useShowSidebar,
  useSidebarName,
  useUserData,
} from "../utils";
import { Link, useNavigate } from "react-router-dom";
import { MdAssignmentAdd, MdKeyboardDoubleArrowLeft } from "react-icons/md";
export const Sidebar = () => {
  const { getUserData, setUserData } = useUserData();
  const { getGlobalAvatar } = useAvatar();
  const { getSidebarName } = useSidebarName();
  const { getShowSidebar, setShowSidebar } = useShowSidebar();

  const role = getUserRole();

  const getUser = async () => {
    try {
      const data = await getUserMe();
      setUserData(data.user);
    } catch (error) {
      console.error(error);
    }
  };

  const user = useMemo(() => {
    return getUserData;
  }, [getUserData]);

  useEffect(() => {
    getUser();
  }, [getGlobalAvatar, getSidebarName]);

  const navigate = useNavigate();

  const sideList = [
    {
      name: "Beranda",
      icon: <House />,
      link: "/dashboard",
    },
    {
      name: role === "user" ? "Favorit" : "Tambah Resep",
      icon:
        role === "user" ? (
          <Heart />
        ) : (
          <MdAssignmentAdd className="lg:text-xl md:text-2xl text-xl" />
        ),
      link: role === "user" ? "/dashboard/favorites" : "/dashboard/createresep",
    },
  ];

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <aside
      className={`lg:relative fixed transition-transform z-50 ${
        getShowSidebar
          ? "-translate-x-0"
          : "lg:-translate-x-0 -translate-x-full"
      }   lg:w-[20%] w-[20rem] h-full flex flex-col items-center justify-between bg-[#1B4242] lg:px-6 px-2 py-8 text-slate-100 duration-200`}>
      <section className="flex flex-col items-center justify-center gap-10">
        <figure className="px-4 rounded-3xl">
          <img
            src="/resepku-new.png"
            alt="resepku"
            width={"150px"}
            className="max-h-[200px]"
          />
        </figure>

        <div className="flex flex-col items-center gap-4">
          <figure className="flex items-center justify-center">
            {user ? (
              <img
                src={getGlobalAvatar || user?.avatar}
                alt="avatar"
                width={"70px"}
                className=" rounded-full"
              />
            ) : (
              <img
                src={"/chef-hat-white.png"}
                alt="avatar"
                width={"70px"}
                className=" rounded-full"
              />
            )}
          </figure>

          <div className="flex flex-col justify-center items-center gap-1">
            {user && (
              <>
                <span className="text-sm opacity-70">Selamat Datang,</span>
                <h1 className="text-xl font-semibold">
                  {getSidebarName || user?.username}
                </h1>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-6">
          {sideList.map((item, idx) => (
            <Link
              key={idx}
              to={item.link}
              className="flex justify-center items-center gap-4 py-2 xl:px-6">
              {item.icon}
              <span className={`text-lg font-semibold`}>{item.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="w-full relative lg:hidden flex justify-end items-center">
        <button onClick={() => setShowSidebar(!getShowSidebar)}>
          <MdKeyboardDoubleArrowLeft className="text-5xl animate-pulse" />
        </button>
      </div>

      <button
        className="flex justify-center items-center gap-4 py-2 px-6"
        onClick={handleLogout}>
        <Logout />
        <span className="text-lg font-semibold">Logout</span>
      </button>
    </aside>
  );
};
