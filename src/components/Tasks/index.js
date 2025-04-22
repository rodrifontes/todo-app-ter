import { TouchableOpacity, FlatList } from 'react-native';

import { Text } from '../Text';

import { Task, TaskHeader, TaskDescription, TaskFooter, TaskIcon, TaskStatus, TaskAction } from './styles';

import pending from '../../assets/images/pending.png';
import done from '../../assets/images/done.png';
import edit from '../../assets/images/edit.png';
import excluir from '../../assets/images/delete.png';

export default function Tasks({ tasks, onDelete, onEditTask, onChangeStatus }) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={task => task.id}
      renderItem={({ item: task }) => (
        <Task>
          <TaskHeader>
            <Text size={18} weight="600">{task.title}</Text>
          </TaskHeader>

          <TaskDescription>
            <Text opacity={0.5}>{task.description}</Text>
          </TaskDescription>

          <TaskFooter>
            <TaskStatus onPress={() => onChangeStatus(task)}>
              <TaskIcon source={task.done ? done : pending} />
              <Text color={task.done ? '#2192d8' : '#e620ae'}>
                {task.done ? 'Feita' : 'Pendente'}
              </Text>
            </TaskStatus>

            <TaskAction>
              <TouchableOpacity onPress={() => onEditTask(task)}>
                <TaskIcon source={edit} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onDelete(task)}>
                <TaskIcon source={excluir} />
              </TouchableOpacity>
            </TaskAction>
          </TaskFooter>
        </Task>
      )}
    />
  );
}