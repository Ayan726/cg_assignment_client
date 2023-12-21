import { useEffect, useState } from "react";
import "./App.css";
import { useTaskStore } from "./store/taskStore";
import { createTask, readOneTask, updateTask, deleteTask } from "./api/Tasks";
import correct from "../public/correct.png";
import remove from "../public/remove.png";

function App() {
  const tasks = useTaskStore((store) => store.tasks);
  const setTasks = useTaskStore((store) => store.setTasks);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState("");

  useEffect(() => {
    setTasks();
  }, []);

  return (
    <div className="app-container" id="taskList">
      <h1 className="app-header">TO DO LIST</h1>
      <div className="add-task">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          required
          autoComplete="off"
          placeholder="Add New Task Title"
          className="task-input"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          required
          autoComplete="off"
          placeholder="Add New Task Description"
          className="task-input"
        />
        {edit && (
          <>
            <button onClick={async () => {
              await updateTask(editId, title, description);
              setTasks();
              setEdit(false);
              setEditId("");
              setTitle("");
              setDescription("");
            }} className="edit-icon">
              <img src={correct} alt="correct" height={32} width={32} />
            </button>
            <button
              onClick={() => {
                setEdit(false);
                setEditId("");
                setTitle("");
                setDescription("");
              }}
              className="edit-icon"
            >
              <img src={remove} alt="remove" height={32} width={32} />
            </button>
          </>
        )}

        {!edit && (
          <button
            onClick={async (e) => {
              e.preventDefault();
              await createTask(title, description);
              setTasks();
              setTitle("");
              setDescription("");
            }}
            type="submit"
            value=""
            className="submit-task"
            title="Add Task"
          />
        )}
      </div>
      <ul className="task-list">
        {tasks?.map((task, ind) => (
          <li key={ind} className="task-list-item" v-for="task in tasks">
            <div className="task-wrapper">
              <h4>{task.title}</h4>
              <p>{task.description}</p>
            </div>
            <div className="icon-wrapper">
              <span
                onClick={() => {
                  setEdit(true);
                  setEditId(task._id);
                  setTitle(task.title);
                  setDescription(task.description);
                }}
                className="edit-btn btn"
              ></span>
              <span
                onClick={async () => {
                  await deleteTask(task._id);
                  setTasks();
                }}
                className="delete-btn btn"
              ></span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
