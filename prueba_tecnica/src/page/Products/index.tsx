import DeleteAlertDialog from "@/components/delete-alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  deleteProductReducer,
  setProductListReducer,
} from "@/redux/slice/productSlice";
import { RootState } from "@/redux/store";
import { deleteOneProduct, findAllProducts } from "@/services/products";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductForm from "./ProductForm";
const ProductsPage = () => {
  const dispath = useDispatch();
  const { toast } = useToast();

  // const [productList, setProductList] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const productList = useSelector(
    (state: RootState) => state.product.productList,
  );
  const calegoryList = useSelector(
    (state: RootState) => state.category.calegoryList,
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("0");

  useEffect(() => {
    (async () => {
      if (productList.length === 0) {
        setLoading(true);
        try {
          const response = await findAllProducts();
          dispath(setProductListReducer(response));
        } catch (error) {
          if (axios.isAxiosError(error)) {
            toast({
              title: error.response?.data.error,
              variant: "destructive",
            });
          }
          dispath(setProductListReducer([]));
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [dispath, productList.length, toast]);

  const handleProductDelete = async (productId: number) => {
    try {
      const response = await deleteOneProduct(productId);
      if (response) {
        dispath(deleteProductReducer(productId));
        toast({
          title: "Producto eliminado",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          title: error.response?.data?.message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div>
      <div className=" flex justify-end">
        <ProductForm edit={false} />
      </div>

      <Select
        defaultValue={selectedCategoryId}
        onValueChange={async (e) => {
          try {
            setSelectedCategoryId(e);
            const response = await findAllProducts({ categoryId: e });
            dispath(setProductListReducer(response));
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
        }}
      >
        <SelectTrigger className="w-[180px] pt-1">
          <SelectValue placeholder="Filtrar categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={"0"}>Todas las categorias </SelectItem>
            {calegoryList.map((item) => {
              return (
                <SelectItem key={item.id} value={item.id.toString()}>
                  {item.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      {loading ? (
        <h3 className="pt-5">cargando...</h3>
      ) : (
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead className="text-right">Opciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productList.map((item) => {
              let cleanedString = item.images[0].replace(/^\[|\]$/g, "");
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
                      <h3>{item.title}</h3>
                    </div>
                  </TableCell>
                  <TableCell>{item.category.name}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-y-2 items-center">
                      <ProductForm product={item} edit={true} />
                      <DeleteAlertDialog
                        onPressedDelete={() => handleProductDelete(item.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}

      {productList.length == 0 && !loading && <h3>No existen productos</h3>}
    </div>
  );
};

export default ProductsPage;
