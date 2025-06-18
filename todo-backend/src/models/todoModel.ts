import pool from '../db';

export type Todo = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
};

export type TodoUpdate = Partial<Pick<Todo, 'title' | 'description' | 'completed'>>;

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

// Update todo (partial update)
export const updateTodo = async (id: number, updates: TodoUpdate): Promise<Todo> => {
  const fields = [];
  const values = [];
  let idx = 1;

  if (updates.title !== undefined) {
    fields.push(`title = $${idx++}`);
    values.push(updates.title);
  }

  if (updates.description !== undefined) {
    fields.push(`description = $${idx++}`);
    values.push(updates.description);
  }

  if (updates.completed !== undefined) {
    fields.push(`completed = $${idx++}`);
    values.push(updates.completed);
  }

  if (fields.length === 0) {
    throw new Error('No fields to update');
  }

  values.push(id);
  const query = `UPDATE todos SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;

  const res = await pool.query(query, values);
  return res.rows[0];
};

// Delete todo
export const deleteTodo = async (id: number): Promise<void> => {
  await pool.query('DELETE FROM todos WHERE id = $1', [id]);
};
