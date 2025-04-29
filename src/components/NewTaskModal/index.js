import CustomModal from "../CustomModal";

import { Text } from "../Text";

export default function NewTaskModal({ visible, onClose, onSave }) {
  return (
    <CustomModal visible={visible}>
      <Text>New Task Modal</Text>
    </CustomModal>
  );
}