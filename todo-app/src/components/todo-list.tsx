// src/components/todo-list.tsx

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";  // Import Pencil icon for edit
import type { Todo } from "@/types/todo";

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onDelete: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onUpdate, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      {todos.length === 0 ? (
        <p className="text-center text-muted-foreground">No todos to display.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todos.map((todo, index) => (
              <TableRow key={todo.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{todo.title}</TableCell>
                <TableCell>{todo.completed ? 'Completed' : 'Active'}</TableCell>
                <TableCell className="flex gap-2 justify-center items-center">
                  {/* Mark Done/Active toggle button */}
                  <Button
                    variant="outline"
                    onClick={() => onUpdate(todo.id, { completed: !todo.completed })}
                  >
                    {todo.completed ? 'Mark Active' : 'Mark Done'}
                  </Button>

                  {/* Edit (update) button with Pencil icon */}
                  <Button
                    variant="outline"
                    onClick={() => {
                      const newTitle = prompt("Edit todo title:", todo.title);
                      if (newTitle && newTitle.trim() !== "") {
                        onUpdate(todo.id, { title: newTitle.trim() });
                      }
                    }}
                    aria-label="Edit todo"
                    className="p-2"
                  >
                    <Pencil className="w-5 h-5" />
                  </Button>

                  {/* Delete button */}
                  <Button
                    variant="destructive"
                    onClick={() => onDelete(todo.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
