import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
interface DeleteAlertDialogProps {
  onPressedDelete: () => void; // Define la prop que recibirá la función onPressedDelete
}
const DeleteAlertDialog: React.FC<DeleteAlertDialogProps> = ({
  onPressedDelete,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className=" bg-opacity-50   bg-black ">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Importante!!!</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Esta seguro de eliminar este elemento?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onPressedDelete}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteAlertDialog;
