import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import Navbar from "./Component/Navbar";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const savedTodos = JSON.parse(todoString);
      setTodos(savedTodos);
    }
  }, []);

  const saveTodosToLocalStorage = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleDelete = (id) => {
    setTodos(prevTodos => {
      const newTodos = prevTodos.filter(item => item.id !== id);
      saveTodosToLocalStorage(newTodos);
      return newTodos;
    });
  };

  const handleEdit = (id) => {
    const newTodo = prompt("Edit your todo:");
    if (newTodo) {
      setTodos(prevTodos => {
        const newTodos = prevTodos.map(item => item.id === id ? { ...item, todo: newTodo } : item);
        saveTodosToLocalStorage(newTodos);
        return newTodos;
      });
    }
  };

  const handleAdd = () => {
    if (todo.trim() !== "") {
      setTodos(prevTodos => {
        const newTodos = [...prevTodos, { id: uuidv4(), todo, isCompleted: false }];
        saveTodosToLocalStorage(newTodos);
        return newTodos;
      });
      setTodo("");
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (id) => {
    setTodos(prevTodos => {
      const newTodos = prevTodos.map(item => item.id === id ? { ...item, isCompleted: !item.isCompleted } : item);
      saveTodosToLocalStorage(newTodos);
      return newTodos;
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto my-10 p-6 rounded-xl bg-gradient-to-r from-violet-200 to-blue-200 shadow-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
        <div className="addTodo mb-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Add Your Todos</h2>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder="Enter your task"
              className="flex-1 border-2 border-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={handleKeyPress}
            />
            <button
              onClick={handleAdd}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 w-full sm:w-auto"
            >
              Add Task
            </button>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Your Tasks</h2>
        <div className="todos space-y-4">
          {todos.map(item => (
            <div className="todo flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md" key={item.id}>
              <input 
                type="checkbox" 
                checked={item.isCompleted} 
                onChange={() => handleCheckbox(item.id)} 
                className="mr-4 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <div className={`${item.isCompleted ? "line-through text-gray-400" : "text-gray-700"} flex-1 mb-4 sm:mb-0`}>
                {item.todo}
              </div>
              <div className="buttons space-y-2 sm:space-y-0 sm:space-x-2 flex flex-col sm:flex-row">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 w-full sm:w-auto"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(item.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200 w-full sm:w-auto"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
