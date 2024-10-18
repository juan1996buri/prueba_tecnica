import { setResetCredentialReducer } from "@/redux/slice/authSlice";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

const navLinks = [
  {
    title: "Categorias",
    link: "/categories",
  },
  {
    title: "Productos",
    link: "/products",
  },
];

const Sidebar = () => {
  const dispath = useDispatch();
  return (
    <div className="flex flex-col justify-between h-full shadow-2xl">
      <ul className="flex flex-col gap-y-5 px-2 pt-3">
        {navLinks.map((itemLink, index) => {
          return (
            <NavLink
              to={`${itemLink.link}`}
              className={({ isActive }) =>
                `rounded-sm text-center py-1 font-semibold ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-500 hover:text-white"
                }`
              }
              key={index}
            >
              {itemLink.title}
            </NavLink>
          );
        })}
      </ul>

      <button
        onClick={() => dispath(setResetCredentialReducer())}
        className="flex flex-row items-center justify-center gap-y-5 px-2  hover:bg-blue-500 hover:text-white rounded-sm mx-2 mb-2 p-1"
      >
        {/* <button
          className="0 rounded-sm  text-center py-1 font-semibold hover:bg-blue-500 hover:text-white "
          type="button"
          onClick={() => dispath(setResetCredentialReducer())}
        ></button> */}
        <LogOut />
        <span>Salir</span>
      </button>
    </div>
  );
};

export default Sidebar;
