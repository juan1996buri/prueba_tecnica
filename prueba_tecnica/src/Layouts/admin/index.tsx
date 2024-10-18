import Sidebar from "@/components/sidebar";
import SidebarMobile from "@/components/sidebarMobile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { setCategoryListReducer } from "@/redux/slice/categorySlice";
import { RootState } from "@/redux/store";
import { findAllCategories } from "@/services/categories";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
const AdminLayout = () => {
  const authCredential = useSelector(
    (state: RootState) => state.auth.authCredential,
  );
  const categoryList = useSelector(
    (state: RootState) => state.category.calegoryList,
  );
  const { toast } = useToast();

  const dispath = useDispatch();

  useEffect(() => {
    (async () => {
      if (categoryList.length === 0) {
        try {
          const response = await findAllCategories();
          dispath(setCategoryListReducer(response));
        } catch (error) {
          if (axios.isAxiosError(error)) {
            toast({
              title:
                error.response?.data?.message ??
                "Se ha producido un error intente mas tarde",
              variant: "destructive",
            });
          }
          dispath(setCategoryListReducer([]));
        }
      }
    })();
  }, [categoryList.length, dispath, toast]);

  return (
    <div className="flex h-screen overflow-hidden  ">
      <div className="w-44  overflow-y-auto  md:block hidden  border-l-4 border-gray-400 shadow-lg shadow-gray-500/50">
        <Sidebar />
      </div>
      <div className="flex-1  overflow-y-auto relative">
        <header className=" bg-white fixed top-0 right-0 md:left-44 left-0  h-12  flex justify-between items-center px-3 z-10  border-gray-400  ">
          <SidebarMobile />

          <div className="flex items-center gap-x-2 h-full">
            <Avatar>
              <AvatarImage
                src={authCredential?.avatar}
                alt="@shadcn"
                className="object-cover"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h3 className="font-semibold">{authCredential?.name}</h3>
          </div>
        </header>
        <div className="md:px-20 px-4 pt-20 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
