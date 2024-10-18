import DeleteAlertDialog from "@/components/delete-alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { deleteCategoryReducer } from "@/redux/slice/categorySlice";
import { RootState } from "@/redux/store";
import { deleteOneCategory } from "@/services/categories";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import CategoryForm from "./CategoryForm";

const CategoriesPage = () => {
  const dispath = useDispatch();
  const { toast } = useToast();

  const categoryList = useSelector(
    (state: RootState) => state.category.calegoryList,
  );

  const handleCategoryDelete = async (categoryId: number) => {
    try {
      const response = await deleteOneCategory(categoryId);
      if (response) {
        dispath(deleteCategoryReducer(categoryId));
        toast({
          title: "Categoria eliminada",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          title:
            error.response?.data?.message ??
            "Se ha producido un error intente mas tarde",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className=" ">
      <div className=" flex justify-end">
        {/* <ProductForm edit={false} /> */}
        <CategoryForm edit={false} />
      </div>

      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead className="text-center">Opciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categoryList.map((item) => {
            let cleanedString = item.image.replace(/^\[|\]$/g, "");
            cleanedString = cleanedString.replace(/^"|"$/g, "");
            return (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell className="">
                  <div className="flex gap-x-4 justify-start items-center">
                    <Avatar>
                      <AvatarImage src={cleanedString} alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h3>{item.name}</h3>
                  </div>
                </TableCell>

                <TableCell className="text-center">
                  <div className="flex flex-col gap-y-2 items-center">
                    <CategoryForm category={item} edit={true} />
                    <DeleteAlertDialog
                      onPressedDelete={() => handleCategoryDelete(item.id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {categoryList.length == 0 && <h3>No existen categorias</h3>}
    </div>
  );
};

export default CategoriesPage;
