import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Sidebar from "./sidebar";
const SidebarMobile = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:invisible block" type="button">
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side={"left"} className="w-48 p-0 pt-5">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
export default SidebarMobile;
