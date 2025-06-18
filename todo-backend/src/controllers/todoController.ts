import { Request, Response } from 'express';
import * as TodoModel from '../models/todoModel';

export const getTodos = async (_req: Request, res: Response): Promise<Response> => {
  const todos = await TodoModel.getAllTodos();
  return res.json(todos);
};

export const getTodo = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  const todo = await TodoModel.getTodoById(id);
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  return res.json(todo);
};

export const addTodo = async (req: Request, res: Response): Promise<Response> => {
  const { title, description } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ message: 'Title is required' });
  }
  const todo = await TodoModel.createTodo(title, description);
  return res.status(201).json(todo);
};

export const updateTodo = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  const { title, description, completed } = req.body;

  const existing = await TodoModel.getTodoById(id);
  if (!existing) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  // Pass updates as a single object
  const updates = {} as { title?: string; description?: string; completed?: boolean };
  if (title !== undefined) updates.title = title;
  if (description !== undefined) updates.description = description;
  if (completed !== undefined) updates.completed = completed;

  const updated = await TodoModel.updateTodo(id, updates);

  return res.json(updated);
};

export const deleteTodo = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  await TodoModel.deleteTodo(id);
  return res.status(204).send();
};
