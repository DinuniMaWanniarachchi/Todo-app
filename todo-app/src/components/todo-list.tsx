// src/components/todo-list.tsx
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Check, X } from "lucide-react";

import type { Todo } from "@/types/todo";

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onDelete: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleEditClick = (todo: Todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
  };

  const handleSaveEdit = () => {
    if (editingId && editTitle.trim() !== "") {
      onUpdate(editingId, { 
        title: editTitle.trim(),
        description: editDescription.trim()
      });
      setEditingId(null);
      setEditTitle("");
      setEditDescription("");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

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
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todos.map((todo, index) => (
              <TableRow key={todo.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {editingId === todo.id ? (
                    <div className="flex flex-col gap-2">
                      <Input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Todo title"
                        autoFocus
                      />
                      <Input
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Todo description (optional)"
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={handleSaveEdit}
                          disabled={!editTitle.trim()}
                          className="bg-green-500 hover:bg-green-600 text-white p-1"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCancelEdit}
                          className="p-1"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    todo.title
                  )}
                </TableCell>
                <TableCell>
                  {editingId === todo.id ? (
                    <span className="text-sm text-muted-foreground">Editing...</span>
                  ) : (
                    todo.description || <span className="text-muted-foreground italic">No description</span>
                  )}
                </TableCell>
                <TableCell className={todo.completed ? "text-green-600 font-medium" : 
                    "text-yellow-600 font-medium"}>{todo.completed ? "Completed" : "Active"}
                </TableCell>
                <TableCell className="flex gap-2 justify-center items-center">
                  {editingId === todo.id ? (
                    <span className="text-sm text-muted-foreground">Editing...</span>
                  ) : (
                    <>
                      {/* Mark Done/Active toggle button */}
                      <Button
                        variant="outline"
                        onClick={() => onUpdate(todo.id, { completed: !todo.completed })}
                      >
                        {todo.completed ? 'Mark Active' : 'Mark Done'}
                      </Button>
                      
                      {/* Edit (update) button with Pencil icon - Yellow color */}
                      <Button
                        variant="outline"
                        onClick={() => handleEditClick(todo)}
                        aria-label="Edit todo"
                        className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500 hover:border-yellow-600"
                      >
                        <Pencil className="w-5 h-5" />
                      </Button>
                      
                      {/* Delete button with Trash2 icon */}
                      <Button
                        variant="destructive"
                        onClick={() => onDelete(todo.id)}
                        aria-label="Delete todo"
                        className="p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};