import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  setAuthReducer,
  setResetCredentialReducer,
  setTokensReducer,
} from "@/redux/slice/authSlice";
import {
  getUserWithSession,
  loginUser,
  registerOneUser,
} from "@/services/auth";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { toast } = useToast();

  const navigate = useNavigate();
  const dispath = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedImageSave, setSelectedImageSave] = useState<string>("");
  const form = document.querySelector("form");

  const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email")! as string;
    const password = formData.get("password")! as string;

    setLoading(true);
    try {
      const response = await loginUser({ email, password });
      dispath(setTokensReducer(response));
      const responseSession = await getUserWithSession();
      dispath(setAuthReducer(responseSession));
      navigate("/products");
      toast({
        title: `Bienvenido ${responseSession.name}`,
      });
      form?.reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          title:
            error.response?.data?.message ??
            "Se ha producido un error intente mas tarde",
          variant: "destructive",
        });
      }
      dispath(setResetCredentialReducer());
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitRegister = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email")! as string;
    const password = formData.get("password")! as string;
    const name = formData.get("name")! as string;
    const avatar = formData.get("avatar")! as string;
    try {
      await registerOneUser({ avatar, email, password, name });
      toast({
        title: "Te has registrado correctamete",
      });
      form?.reset();
      setSelectedImage("");
      setSelectedImageSave("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          title:
            error.response?.data?.message ??
            "Se ha producido un error intente mas tarde",
          variant: "destructive",
        });
      }
      dispath(setResetCredentialReducer());
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="   w-full h-screen flex justify-center items-center">
      <Tabs defaultValue="login" className="w-[400px] ">
        <TabsList className="grid w-full grid-cols-2 ">
          <TabsTrigger value="login">Iniciar sesión</TabsTrigger>
          <TabsTrigger value="password">Registrarse</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <form onSubmit={handleSubmitLogin}>
            <Card>
              <CardHeader>
                <CardTitle>Bienvenido</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="email"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    minLength={4}
                    placeholder="contraseña"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading}>
                  Continuar
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
        <TabsContent value="password">
          <form onSubmit={handleSubmitRegister}>
            <Card>
              <CardHeader>
                <CardTitle>Bienvenido</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" required name="name" placeholder="nombre" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="email"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    required
                    placeholder="contraseña"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="avatar">Avatar</Label>
                  <div
                    className={`flex gap-x-2 ${
                      selectedImageSave ? "hidden" : "block"
                    }`}
                  >
                    <Input
                      id="avatar"
                      name="avatar"
                      placeholder="Ingrese una url que inicie con https://"
                      required
                      value={selectedImage}
                      onChange={(e) => {
                        setSelectedImage(e.target.value);
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        if (selectedImage.trim().startsWith("https://")) {
                          setSelectedImageSave(selectedImage);
                        } else {
                          toast({
                            title: "Url imgen invalida",
                            variant: "destructive",
                          });
                        }
                      }}
                    >
                      Cargar
                    </Button>
                  </div>
                  <div
                    className={`relative ${
                      selectedImageSave ? "block" : "hidden"
                    }`}
                  >
                    <img
                      src={selectedImageSave}
                      className="h-28 w-28 rounded-full object-cover"
                    />
                    <button
                      className="absolute bottom-0 left-0"
                      type="button"
                      onClick={() => {
                        setSelectedImage("");
                        setSelectedImageSave("");
                      }}
                    >
                      <Trash2 className=" text-black" />
                    </button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Continuar</Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoginPage;
