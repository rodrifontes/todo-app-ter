import { useState } from 'react';

import { Text } from '../components/Text';

import { Container } from './styles';

import Header from '../components/Header';
import Tasks from '../components/Tasks';
import AddTaskButton from '../components/AddTaskButton';

import { tasks } from '../mocks/tasks';

import DeleteConfirmModal from '../components/DeleteConfirmModal';
import NewTaskModal from '../components/NewTaskModal';

export default function Main() {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isNewTaskModalVisible, setIsNewTaskModalVisible] = useState(false);

  function handleChangeStatus() {
    alert('Chamar alteração do status');
  }

  function handleDelete() {
    setIsDeleteModalVisible(true);
  }

  function handleConfirmDeleteTask() {
    setIsDeleteModalVisible(false);
  }

  function handleEditTask() {
    alert('Chamar alteração tarefa');
  }

  return (
    <Container>
      <Header />

      <Tasks
        tasks={tasks}
        onChangeStatus={handleChangeStatus}
        onEditTask={handleEditTask}
        onDelete={handleDelete}
      />

      <AddTaskButton onPress={() => setIsNewTaskModalVisible(true)} />

      <DeleteConfirmModal
        visible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        onConfirm={handleConfirmDeleteTask}
      />

      <NewTaskModal
        visible={isNewTaskModalVisible}
        onClose={() => setIsNewTaskModalVisible(false)}
      />
    </Container>
  );
}