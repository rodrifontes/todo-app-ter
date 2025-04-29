import { Modal } from 'react-native';

import { Overlay, ModalBody } from './styles';

export default function CustomModal({ children, visible }) {
  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType='fade'
    >
      <Overlay>
        <ModalBody>
          {children}
        </ModalBody>
      </Overlay>
    </Modal>
  );
}