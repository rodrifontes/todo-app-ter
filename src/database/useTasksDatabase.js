import { useSQLiteContext } from "expo-sqlite";

export function useTasksDatabase() {
  const database = useSQLiteContext();

  async function show() {
    try {
      const query = "SELECT * FROM tasks";

      const response = await database.getAllAsync(query);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async function create(task) {
    const statement = await database.prepareAsync(
      "INSERT INTO tasks (title, description) VALUES ($title, $description)"
    );

    try {
      await statement.executeAsync({
        $title: task.title,
        $description: task.description,
      });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function remove(id) {
    try {
      await database.execAsync(`DELETE FROM tasks WHERE id = ${id}`);
    } catch (error) {
      throw error;
    }
  }

  async function update(task) {
    const statement = await database.prepareAsync(
      "UPDATE tasks SET title = $title, description = $description WHERE id = $id"
    );

    try {
      await statement.executeAsync({
        $id: task.id,
        $title: task.title,
        $description: task.description,
      });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function updateStatus(id) {
    try {
      await database.execAsync(`UPDATE tasks SET done = not done WHERE id = ${id}`);
    } catch (error) {
      throw error;
    }
  }

  return { show, create, remove, update, updateStatus }
}