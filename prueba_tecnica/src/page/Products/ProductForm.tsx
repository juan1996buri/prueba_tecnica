import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProductType } from "@/type.ds";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertDialogDescription,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";

import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import {
  createProductReducer,
  updateProductReducer,
} from "@/redux/slice/productSlice";
import { RootState } from "@/redux/store";
import { createOneProduct, updateOneProduct } from "@/services/products";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "El titulo es muy corto",
  }),
  price: z.string().min(1, {
    message: "Ingrese un cantidad minima",
  }),
  description: z.string().min(1, {
    message: "La descripcion es requerida",
  }),
  creationAt: z.string().optional(),
  updatedAt: z.string().optional(),
  categoryId: z.number(),
  images: z.array(z.string()).min(1, {
    message: "Ingresa por lo menos una imagen",
  }),
});

const ProductForm: React.FC<{ product?: ProductType; edit: boolean }> = ({
  product,
  edit,
}) => {
  const dispatch = useDispatch();
  const calegoryList = useSelector(
    (state: RootState) => state.category.calegoryList,
  );
  const [selectedImageItem, setSelectedImageItem] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      title: product?.title,
      price: product?.price.toString(),
      description: product?.description,
      creationAt: product?.creationAt,
      updatedAt: product?.updatedAt,
      categoryId: product?.category?.id ?? 0,
      images: product?.images ?? [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const productSend: ProductType = {
      ...values,
      id: product?.id ?? 0,
      price: Number(values.price),
      images: values.images,
      description: values.description,
      category: {
        id: values.categoryId!,
        name: "",
        image: "",
      },
    };
    if (edit) {
      try {
        const response = await updateOneProduct(productSend);
        dispatch(updateProductReducer(response));
        toast({
          title: "Producto actualizado correctamente",
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast({
            title: error.response?.data?.message,
            variant: "destructive",
          });
        }
      }
    } else {
      try {
        const response = await createOneProduct(productSend);
        dispatch(createProductReducer(response));
        toast({
          title: "Producto creado correctamente",
        });
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
    }
    form.reset({
      title: product?.title,
      price: product?.price.toString(),
      description: product?.description,
      creationAt: product?.creationAt,
      updatedAt: product?.updatedAt,
      categoryId: product?.category?.id ?? 0,
      images: product?.images ?? [],
    });
    setSelectedImageItem("");
    setOpen(false);
  }

  useEffect(() => {
    if (product) {
      form.reset({
        title: product.title,
        price: product.price.toString(),
        description: product.description,
        creationAt: product.creationAt,
        updatedAt: product.updatedAt,
        categoryId: product.category?.id ?? 0,
        images: product.images ?? [],
      });
    }
  }, [product, form]);

  return (
    <div>
      <AlertDialog open={open}>
        <AlertDialogTrigger>
          {edit ? (
            <Button className={`   bg-black bg-opacity-50`}>
              <Pencil onClick={() => setOpen(true)} color="white" />
            </Button>
          ) : (
            <Button className={`bg-black `} onClick={() => setOpen(true)}>
              Crear nuevo
            </Button>
          )}
        </AlertDialogTrigger>
        <AlertDialogContent className=" overflow-y-auto h-screen    ">
          <AlertDialogTitle className="text-center font-bold text-2xl">
            {edit ? "Editar producto" : "Crear nuevo producto"}
          </AlertDialogTitle>
          <AlertDialogDescription />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titulo</FormLabel>
                    <FormControl>
                      <Input placeholder="titulo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div>
                        <div>
                          <Label htmlFor="images">Imagen</Label>
                          <div className="flex gap-x-2 ">
                            <Input
                              id="images"
                              placeholder="Ingrese una url que inicie con https://"
                              onChange={(e) =>
                                setSelectedImageItem(e.target.value)
                              }
                              defaultValue={selectedImageItem}
                              value={selectedImageItem}
                            />
                            <Button
                              type="button"
                              onClick={() => {
                                if (
                                  selectedImageItem
                                    .trim()
                                    .startsWith("https://")
                                ) {
                                  form.setValue("images", [
                                    selectedImageItem,
                                    ...field.value,
                                  ]);
                                } else {
                                  toast({
                                    title: "URL de imagen invalida",
                                    variant: "destructive",
                                  });
                                }
                                setSelectedImageItem("");
                              }}
                            >
                              Cargar
                            </Button>
                          </div>
                        </div>
                        <section>
                          <Label>Galeria</Label>
                          <ul className="flex space-x-1 overflow-x-auto overflow-hidden w-full h-60">
                            {field?.value?.map((item: string, index) => {
                              let cleanedString = item.replace(/^\[|\]$/g, "");
                              cleanedString = cleanedString.replace(
                                /^"|"$/g,
                                "",
                              );
                              return (
                                <li
                                  key={index}
                                  className="flex-shrink-0  relative  z-10"
                                >
                                  <img
                                    src={cleanedString}
                                    className="object-cover h-full"
                                  />
                                  <div className="absolute z-10 top-0 right-0 p-2">
                                    <Button
                                      className="bg-black bg-opacity-50"
                                      type="button"
                                      onClick={() => {
                                        const newSelectedImages =
                                          field.value.filter(
                                            (_, indexImage) =>
                                              indexImage !== index,
                                          );
                                        form.setValue(
                                          "images",
                                          newSelectedImages,
                                        );
                                      }}
                                    >
                                      <Trash2 />
                                    </Button>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </section>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="precio"
                        {...field}
                        pattern="\d*"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripcion</FormLabel>
                    <FormControl>
                      <Input placeholder="description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select
                        onValueChange={(e) => field.onChange(Number(e))}
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="seleccionar una categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {calegoryList.map((categoryItem) => {
                            return (
                              <SelectItem value={categoryItem.id.toString()}>
                                {categoryItem.name}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              {edit && (
                <FormField
                  control={form.control}
                  name="creationAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha creacion</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Fecha creacion "
                          {...field}
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {edit && (
                <FormField
                  control={form.control}
                  name="updatedAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha de actualizacion</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Fecha de actualizacion"
                          {...field}
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* <Button type="submit">Submit</Button> */}
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => {
                    setOpen(false);
                    // form.resetField("title");
                    // form.resetField("images");
                    // form.resetField("price");
                    // form.resetField("description");
                    setSelectedImageItem("");
                  }}
                >
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction type="submit">Continuar</AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default ProductForm;
