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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CategoryType } from "@/type.ds";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertDialogDescription,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";

import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import {
  createCategoryReducer,
  updateCategoryReducer,
} from "@/redux/slice/categorySlice";
import { createOneCategory, updateOneCategory } from "@/services/categories";
import axios from "axios";
import { useDispatch } from "react-redux";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "El titulo es requerido",
  }),
  image: z.string({ message: "Es requerido una imagen" }),
  creationAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

const CategoryForm: React.FC<{ category?: CategoryType; edit: boolean }> = ({
  category,
  edit,
}) => {
  const dispatch = useDispatch();
  const [selectedImageItem, setSelectedImageItem] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name,
      image: category?.image,
      creationAt: category?.creationAt,
      updatedAt: category?.updatedAt,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const categorySend: CategoryType = {
      ...values,
      id: category?.id ?? 0,
      name: values?.name ?? "",
      image: values?.image ?? " ",
    };
    if (edit) {
      try {
        const response = await updateOneCategory(categorySend);
        dispatch(updateCategoryReducer(response));
        toast({
          title: "Categoria actualizado correctamente",
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
        const response = await createOneCategory(categorySend);
        dispatch(createCategoryReducer(response));
        toast({
          title: "Categoria creado correctamente",
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
    form.resetField("name");
    form.resetField("image");
    setSelectedImageItem("");
    setOpen(false);
  }
  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
        image: category.image,
        creationAt: category.creationAt,
        updatedAt: category.updatedAt,
      });
    }
  }, [category, form]);

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
            {edit ? "Editar categoria" : "Crear nueva categoria"}
          </AlertDialogTitle>
          <AlertDialogDescription />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="nombre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imagen</FormLabel>
                    <FormControl>
                      <div>
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
                                selectedImageItem.trim().startsWith("https://")
                              ) {
                                // setSelectedImageSave(selectedImageItem.trim());

                                form.setValue(
                                  "image",
                                  selectedImageItem.trim(),
                                );
                                setSelectedImageItem("");
                              }
                            }}
                          >
                            Cargar
                          </Button>
                        </div>
                        <section>
                          <Label>Galeria </Label>

                          <ul className="flex space-x-1 overflow-x-auto overflow-hidden w-full h-60">
                            <li className="flex-shrink-0  relative  z-10">
                              <img
                                src={
                                  field.value
                                    ? field.value
                                        .replace(/^\[|\]$/g, "")
                                        .replace(/^"|"$/g, "")
                                    : ""
                                }
                                className="object-cover h-full"
                              />
                            </li>
                          </ul>
                        </section>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

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
                    form.resetField("name");
                    form.resetField("image");
                    setSelectedImageItem("");
                    setOpen(false);
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
export default CategoryForm;
