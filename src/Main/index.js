import { Text } from '../components/Text';

import { Container } from './styles';

import Header from '../components/Header';
import Tasks from '../components/Tasks';
import AddTaskButton from '../components/AddTaskButton';

import { tasks } from '../mocks/tasks';

export default function Main() {

  function handleChangeStatus() {
    alert('Chamar alteração do status');
  }

  function handleDelete() {
    alert('Chamar exclusão tarefa');
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

      <AddTaskButton onPress={() => alert("Cadastro Tarefa")} />
    </Container>
  );
}