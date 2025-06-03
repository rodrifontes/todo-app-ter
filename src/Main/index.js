import { useState, useEffect } from 'react';

import { Text } from '../components/Text';

import { Container, TaskEmptyContainer, TaskEmptyImage, CenteredContainer } from './styles';

import Header from '../components/Header';
import Tasks from '../components/Tasks';
import AddTaskButton from '../components/AddTaskButton';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import NewTaskModal from '../components/NewTaskModal';
import EditTaskModal from '../components/EditTaskModal';

import task from '../assets/images/task.png';

import { ActivityIndicator } from 'react-native';

import { useTasksDatabase } from '../database/useTasksDatabase';

import { api } from '../utils/api';

export default function Main() {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isNewTaskModalVisible, setIsNewTaskModalVisible] = useState(false);
  const [isEditTaskModalVisible, setIsEditTaskModalVisible] = useState(false);
  const [taskBeingEdit, setTaskBeingEdit] = useState(null);
  const [taskIdBeingDelete, setTaskIdBeingDelete] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const tasksDatabase = useTasksDatabase();

  async function getTasks() {
    try {
      setIsLoading(true);
      setTasks(await tasksDatabase.show());
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    //getTasks();
    api.get('/tasks').then((response) => {
      setTasks(response.data);
      setIsLoading(false);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  async function handleChangeStatus(id) {
    // tasksDatabase.updateStatus(id);
    // getTasks();
    const taskChange = (await api.put(`/tasks/status/${id}`, task)).data;

    setTasks((prevState) => {
      const itemIndex = prevState.findIndex(taskItem => taskItem.id === id);
      const newTasks = [...prevState];
      newTasks[itemIndex] = taskChange;

      return newTasks;
    });

  }

  function handleDelete(id) {
    setTaskIdBeingDelete(id);
    setIsDeleteModalVisible(true);
  }

  function handleConfirmDeleteTask() {
    // tasksDatabase.remove(taskIdBeingDelete);
    // getTasks();
    api.delete(`/tasks/${taskIdBeingDelete}`).then(() => {
      setTasks(tasks.filter(task => task.id !== taskIdBeingDelete));
    }).catch((error) => {
      console.log(error);
    });

    setIsDeleteModalVisible(false);
  }

  function handleEditTask(task) {
    setTaskBeingEdit(task);
    setIsEditTaskModalVisible(true);
  }

  async function handleCreateTask(task) {
    //tasksDatabase.create(task);
    //getTasks();
    const taskAdd = (await api.post('/tasks', task)).data;

    tasks.unshift(taskAdd);
    setTasks(tasks);

    setIsNewTaskModalVisible(false);
  }

  async function handleSaveEdit(task) {
    // tasksDatabase.update({ ...task, id: taskBeingEdit.id });
    // getTasks();
    const taskChange = (await api.put(`/tasks/${taskBeingEdit.id}`, task)).data;

    setTasks((prevState) => {
      const itemIndex = prevState.findIndex(taskItem => taskItem.id === taskBeingEdit.id);
      const newTasks = [...prevState];
      newTasks[itemIndex] = taskChange;

      return newTasks;
    });

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