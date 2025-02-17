import { useState } from "react";
import AddTask from "./components/addtask";

const App = () => {
  const [tasks, setTasks] = useState<{ text: string; completed: boolean }[]>(
    []
  );

  const [editingTask, setEditingTask] = useState<string | null>(null);

  const [editedText, setEditedText] = useState<string>("");

  const handleAddTask = (newTask: string) => {
    setTasks([...tasks, { text: newTask, completed: false }]);
  };

  const handleDeleteTask = (taskToDelete: string) => {
    setTasks(tasks.filter((task) => task.text !== taskToDelete));
  };

  const handleEditTask = (taskToEdit: string) => {
    setEditingTask(taskToEdit);
    setEditedText(taskToEdit);
  };

  const handleSaveTask = (oldTask: string) => {
    setTasks(
      tasks.map((task) =>
        task.text === oldTask ? { ...task, text: editedText } : task
      )
    );
    setEditingTask(null);
    setEditedText("");
  };

  const handleToggleComplete = (taskText: string) => {
    setTasks(
      tasks.map((task) =>
        task.text === taskText ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <>
      <h1>Task Planner</h1>
      <AddTask onAddTask={handleAddTask} />

      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task.text)}
            />

            {editingTask === task.text ? (
              <>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSaveTask(task.text);
                    }
                  }}
                  autoFocus
                />
                <button onClick={() => handleSaveTask(task.text)}>Save</button>
                <button onClick={() => setEditingTask(null)}>Cancel</button>
              </>
            ) : (
              <>
                {task.text}
                <button onClick={() => handleEditTask(task.text)}>Edit</button>
                <button onClick={() => handleDeleteTask(task.text)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
