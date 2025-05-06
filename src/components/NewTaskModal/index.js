import { Image, TouchableOpacity } from "react-native";

import CustomModal from "../CustomModal";
import TaskForm from "../TaskForm";

import { Text } from "../Text";

import { Header } from "./styles";

import close from '../../assets/images/close.png';

export default function NewTaskModal({ visible, onClose, onSave }) {
  return (
    <CustomModal visible={visible}>
      <Header>
        <Text weight="600">Adicionar tarefa</Text>

        <TouchableOpacity onPress={onClose}>
          <Image source={close} />
        </TouchableOpacity>
      </Header>

      <TaskForm />
    </CustomModal>
  );
}