// src/App.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import { TodoList } from "@/components/todo-list";
import { TodoForm } from "@/components/todo-form";
import type { Todo, TodoFormData } from "@/types/todo";

const API_BASE = "http://localhost:5000/api/todos";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all todos from backend
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await axios.get<Todo[]>(API_BASE);
      setTodos(res.data);
    } catch (err) {
      console.error("Failed to fetch todos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add new todo
  const addTodo = async (todoData: TodoFormData) => {
    try {
      await axios.post(API_BASE, todoData);
      await fetchTodos();
    } catch (err) {
      console.error("Failed to add todo", err);
    }
  };

  // Update todo by id
  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    try {
      await axios.put(`${API_BASE}/${id}`, updates);
      await fetchTodos();
    } catch (err) {
      console.error("Failed to update todo", err);
    }
  };

  // Delete todo by id
  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      await fetchTodos();
    } catch (err) {
      console.error("Failed to delete todo", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="container mx-auto px-4 py-10 max-w-2xl">
        <h1 className="text-center text-4xl font-bold mb-8">Todo App</h1>

        <TodoForm onAdd={addTodo} />

        {loading ? (
          <p className="text-center text-muted-foreground">Loading todos...</p>
        ) : (
          <TodoList todos={todos} onUpdate={updateTodo} onDelete={deleteTodo} />
        )}
      </div>
    </div>
  );
}
