import { TouchableOpacity, Image } from "react-native";
import CustomModal from "../CustomModal";
import { Text } from "../Text";
import { Header } from "./styles";
import close from '../../assets/images/close.png';
import TaskForm from "../TaskForm";

export default function EditTaskModal({ visible, onClose, onSave, task }) {
  return (
    <CustomModal visible={visible}>
      <Header>
        <Text weight="600">Editar tarefa</Text>

        <TouchableOpacity onPress={onClose}>
          <Image source={close} />
        </TouchableOpacity>
      </Header>

      <TaskForm
        task={task}
        onSave={onSave}
        buttonLabel="Alterar"
      />
    </CustomModal>
  );
}