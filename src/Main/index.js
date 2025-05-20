import { useState } from 'react';

import { Text } from '../components/Text';

import { Container, TaskEmptyContainer, TaskEmptyImage, CenteredContainer } from './styles';

import Header from '../components/Header';
import Tasks from '../components/Tasks';
import AddTaskButton from '../components/AddTaskButton';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import NewTaskModal from '../components/NewTaskModal';
import EditTaskModal from '../components/EditTaskModal';

import task from '../assets/images/task.png';

import { tasks as mock } from '../mocks/tasks';
import { ActivityIndicator } from 'react-native';

export default function Main() {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isNewTaskModalVisible, setIsNewTaskModalVisible] = useState(false);
  const [isEditTaskModalVisible, setIsEditTaskModalVisible] = useState(false);
  const [taskBeingEdit, setTaskBeingEdit] = useState(null);
  const [tasks, setTasks] = useState(mock);
  const [isLoading, setIsLoading] = useState(false);

  function handleChangeStatus() {
    alert('Chamar alteração do status');
  }

  function handleDelete() {
    setIsDeleteModalVisible(true);
  }

  function handleConfirmDeleteTask() {
    setIsDeleteModalVisible(false);
  }

  function handleEditTask(task) {
    setTaskBeingEdit(task);
    setIsEditTaskModalVisible(true);
  }

  function handleCreateTask(task) {
    //Add a persistência da tarefa
    setIsNewTaskModalVisible(false);
  }

  function handleSaveEdit() {
    setIsEditTaskModalVisible(false);
  }

  return (
    <Container>
      <Header />

      {isLoading && (
        <CenteredContainer>
          <ActivityIndicator size='large' color="#666" />
        </CenteredContainer>
      )}

      {!isLoading && (
        <>
          {tasks.length > 0 ? (
            <Tasks
              tasks={tasks}
              onChangeStatus={handleChangeStatus}
              onEditTask={handleEditTask}
              onDelete={handleDelete}
            />
          ) : (
            <TaskEmptyContainer>
              <TaskEmptyImage source={task} />
              <Text
                size={20}
                weight="600"
                opacity={0.8}
              >
                Sem Tarefas
              </Text>

              <Text opacity={0.5}>Não há tarefas a serem visualizadas</Text>
            </TaskEmptyContainer>
          )}
        </>
      )}

      <AddTaskButton onPress={() => setIsNewTaskModalVisible(true)} />

      <DeleteConfirmModal
        visible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        onConfirm={handleConfirmDeleteTask}
      />

      <NewTaskModal
        visible={isNewTaskModalVisible}
        onClose={() => setIsNewTaskModalVisible(false)}
        onSave={handleCreateTask}
      />

      <EditTaskModal
        visible={isEditTaskModalVisible}
        onClose={() => setIsEditTaskModalVisible(false)}
        onSave={handleSaveEdit}
        task={taskBeingEdit}
      />
    </Container>
  );
}