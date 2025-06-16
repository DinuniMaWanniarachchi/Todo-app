export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

export type TodoFormData = Omit<Todo, 'id' | 'createdAt'>;