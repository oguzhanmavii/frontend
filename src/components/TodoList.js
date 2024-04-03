import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/todolist.css';
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedCompleted, setEditedCompleted] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchTodos();
  }, []);
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/users/todos');
      setTodos(response.data);
    } catch (error) {
      setError('Error fetching todos');
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (todoId) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/users/todos/${todoId}`);
      alert('Todo deleted successfully');
      fetchTodos();
    } catch (error) {
      setError('Error deleting todo');
    } finally {
      setLoading(false);
    }
  };
  const handleUpdate = async (todoId) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/users/todos/${todoId}`, {
        title: editedTitle,
        completed: editedCompleted,
      });
      alert('Todo updated successfully');
      fetchTodos();
    } catch (error) {
      setError('Error updating todo');
    } finally {
      setLoading(false);
    }
  };
  const handleAdd = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/users/todos', {
        title: newTodoTitle,
        completed: false,
      });
      alert('Todo added successfully');
      fetchTodos();
      setNewTodoTitle('');
    } catch (error) {
      setError('Error adding todo');
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="todo-list-container">
      <h1>Todo List</h1>
      <div className="add-todo-form">
        <input
          type="text"
          placeholder="Enter todo title"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
        />
        <button onClick={handleAdd}>Add Todo</button>
      </div>
      <table className="todo-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>
                <input
                  value={todo.id === editedTodo ? editedTitle : todo.title}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={todo.id === editedTodo ? editedCompleted : todo.completed}
                  onChange={(e) => setEditedCompleted(e.target.checked)}
                />
              </td>
              <td className="todo-actions">
                {todo.id === editedTodo ? (
                  <>
                    <button onClick={() => handleUpdate(todo.id)}>Save</button>
                    <button onClick={() => setEditedTodo(null)}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => setEditedTodo(todo.id)}>Edit</button>
                )}
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TodoList;
