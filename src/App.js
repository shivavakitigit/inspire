import React, { useState, useEffect } from "react";
import "./App.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";


function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      const userTodos = data.filter(todo => todo.userId === 1);
      setTodos(userTodos);
    };

    fetchData();
  }, []);

  const handleAddNewTodo = () => {
    const newTodo = {
      title: newTodoTitle,
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setNewTodoTitle('');
  };

  const handleDeleteTodo = index => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const handleCompleteTodo = index => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = true;
    setTodos(updatedTodos);
  };

  const handleFilter = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const filteredTodos = filter === 'completed' ? todos.filter(todo => todo.completed) :
    filter === 'active' ? todos.filter(todo => !todo.completed) :
    todos;

  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>New Task:</label>
            <input
              type="text"
              value={newTodoTitle}
              onChange={e => setNewTodoTitle(e.target.value)}
              placeholder="Enter Task"
            />
          </div>
          <div className="todo-input-item">
            <button className="primary-btn" type="button" onClick={handleAddNewTodo}>
              Add Task
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${filter === 'all' && 'active'}`}
            onClick={() => handleFilter('all')}
          >
            All Tasks
          </button>
          <button
            className={`secondaryBtn ${filter === 'completed' && 'active'}`}
            onClick={() => handleFilter('completed')}
          >
            Completed
          </button>
          <button
            className={`secondaryBtn ${filter === 'active' && 'active'}`}
            onClick={() => handleFilter('active')}
          >
            Active
          </button>
        </div>

        <div className="todo-list">
          {filteredTodos.map((todo, index) => (
            <div className="todo-list-item" key={index}>
              <div>
                <h3>{todo.title}</h3>
                <p>Status: {todo.completed ? 'Completed' : 'Active'}</p>
              </div>
              <div>
                {!todo.completed && (
                  <>
                    <AiOutlineDelete
                      className="icon"
                      onClick={() => handleDeleteTodo(index)}
                    />
                    <BsCheckLg
                      className="check-icon"
                      onClick={() => handleCompleteTodo(index)}
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default App;
