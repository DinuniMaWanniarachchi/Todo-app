import pool from '../db';

export type Todo = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
};

// Get all todos
export const getAllTodos = async (): Promise<Todo[]> => {
  const res = await pool.query('SELECT * FROM todos ORDER BY id ASC');
  return res.rows;
};

// Get single todo
export const getTodoById = async (id: number): Promise<Todo | null> => {
  const res = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);
  return res.rows[0] || null;
};

// Create todo
export const createTodo = async (title: string, description?: string): Promise<Todo> => {
  const res = await pool.query(
    'INSERT INTO todos (title, description) VALUES ($1, $2) RETURNING *',
    [title, description || null]
  );
  return res.rows[0];
};

// Update todo
export const updateTodo = async (
  id: number,
  title: string,
  description: string,
  completed: boolean
): Promise<Todo> => {
  const res = await pool.query(
    `UPDATE todos 
     SET title = $1, description = $2, completed = $3 
     WHERE id = $4 
     RETURNING *`,
    [title, description, completed, id]
  );
  return res.rows[0];
};

// Delete todo
export const deleteTodo = async (id: number): Promise<void> => {
  await pool.query('DELETE FROM todos WHERE id = $1', [id]);
};
