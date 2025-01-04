import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilters from './components/TodoFilters';

function App() {
  // State management for todos and filters
  // Load initial todos from localStorage
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [filters, setFilters] = useState({
    category: 'all',
    priority: 'all',
    status: 'all',
    sortBy: 'dueDate'
  });

  // This useEffect watches todos state and saves to localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos([...todos, {
      ...todo, // Data from TodoForm
      id: Date.now(), 
      completed: false
    }]);

    // ⬆️ This triggers the useEffect above because todos state changed
  };

  const updateTodo = (updatedTodo) => {
    setTodos(todos.map(todo => 
      todo.id === updatedTodo.id ? updatedTodo : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredAndSortedTodos = todos
    .filter(todo => {
      if (filters.category !== 'all' && todo.category !== filters.category) return false;
      if (filters.priority !== 'all' && todo.priority !== filters.priority) return false;
      if (filters.status === 'completed' && !todo.completed) return false;
      if (filters.status === 'active' && todo.completed) return false;
      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'dueDate':
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'priority':
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Enhanced Todo App</h1>
          <TodoForm onAdd={addTodo} />
          <TodoFilters filters={filters} onFilterChange={setFilters} />
          <TodoList 
            todos={filteredAndSortedTodos}
            onUpdate={updateTodo}
            onDelete={deleteTodo}
          />
        </div>
      </div>
    </div>
  );
}

export default App;