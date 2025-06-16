import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TodoForm } from '@/components/todo-form';
import { TodoList } from '@/components/todo-list';
import type { Todo, TodoFormData } from '@/types/todo';

type FilterType = 'all' | 'active' | 'completed';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  const addTodo = (todoData: TodoFormData) => {
    const newTodo: Todo = {
      ...todoData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, ...updates } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const filterButtons: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="container mx-auto px-4 py-10 max-w-2xl">

        {/* Header Section */}
        <div className="text-center mb-8 bg-white rounded-xl p-6 shadow-sm">
          <h1 className="text-4xl font-bold mb-2 text-primary">📋 Todo App</h1>
          <p className="text-muted-foreground">
            Stay organized and productive with your personal todo list.
          </p>
        </div>

        {/* Todo Form */}
        <TodoForm onAdd={addTodo} />

        {/* Filter Buttons */}
        {todos.length > 0 && (
          <div className="flex gap-2 justify-center mb-6 bg-white p-3 rounded-lg shadow-sm">
            {filterButtons.map(({ key, label }) => {
              const count = todos.filter(todo => {
                switch (key) {
                  case 'active':
                    return !todo.completed;
                  case 'completed':
                    return todo.completed;
                  default:
                    return true;
                }
              }).length;

              return (
                <Button
                  key={key}
                  variant={filter === key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(key)}
                >
                  {label}
                  {key !== 'all' && count > 0 && ` (${count})`}
                </Button>
              );
            })}
          </div>
        )}

        {/* Todo List */}
        <TodoList
          todos={filteredTodos}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  );
}

export default App;