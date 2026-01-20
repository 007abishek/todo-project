import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import {
  addTodo,
  getTodos,
  deleteTodo,
  updateTodo,
} from "../utils/indexDb";

const TodoSection = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!user) return;

    getTodos().then((allTodos) => {
      const userTodos = allTodos.filter(
        (todo) => todo.userId === user.uid
      );
      setTodos(userTodos);
    });
  }, [user]);

  const handleAddTodo = async () => {
    if (!text.trim()) return;

    if (user.isAnonymous && todos.length >= 3) {
      alert("Guest users can add only 3 todos. Please login.");
      return;
    }

    const newTodo = {
      text,
      userId: user.uid,
      completed: false,
    };

    const id = await addTodo(newTodo);
    setTodos([...todos, { ...newTodo, id }]);
    setText("");
  };

  const handleToggleTodo = async (id, completed) => {
    await updateTodo(id, { completed });

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed } : todo
      )
    );
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Todos</h3>

      {/* INPUT */}
      <div className="flex items-center gap-3 mb-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter todo"
          className="flex-1 px-3 py-2 rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleAddTodo}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* LIST */}
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between px-3 py-2 rounded-md bg-gray-100 dark:bg-slate-800"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(e) =>
                  handleToggleTodo(todo.id, e.target.checked)
                }
                className="w-4 h-4 accent-blue-600"
              />

              <span
                className={`${
                  todo.completed
                    ? "line-through text-gray-400"
                    : ""
                }`}
              >
                {todo.text}
              </span>
            </div>

            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoSection;
