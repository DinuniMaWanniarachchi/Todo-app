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
        description: editDescription.trim(),
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
    if (e.key === "Enter") handleSaveEdit();
    if (e.key === "Escape") handleCancelEdit();
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
      {todos.length === 0 ? (
        <p className="text-center text-muted-foreground">No todos found. Start by adding one!</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-12 text-center">#</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todos.map((todo, index) => (
              <TableRow
                key={todo.id}
                className="hover:bg-gray-50 transition duration-150 ease-in-out"
              >
                <TableCell className="text-center text-muted-foreground font-semibold">
                  {index + 1}
                </TableCell>

                <TableCell className="max-w-[180px] truncate" title={todo.title}>
                  {editingId === todo.id ? (
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Todo title"
                      autoFocus
                    />
                  ) : (
                    <span className="text-base font-medium">{todo.title}</span>
                  )}
                </TableCell>

                <TableCell className="max-w-[220px] truncate" title={todo.description || ""}>
                  {editingId === todo.id ? (
                    <Input
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Description"
                    />
                  ) : (
                    <span className="text-sm text-muted-foreground italic">
                      {todo.description || "No description"}
                    </span>
                  )}
                </TableCell>

                <TableCell className="text-center">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      todo.completed
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {todo.completed ? "Completed" : "Active"}
                  </span>
                </TableCell>

                <TableCell className="flex gap-2 justify-center items-center flex-wrap">
                  {editingId === todo.id ? (
                    <>
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600 text-white"
                        onClick={handleSaveEdit}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancelEdit}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onUpdate(todo.id, { completed: !todo.completed })}
                      >
                        {todo.completed ? "Mark Active" : "Mark Done"}
                      </Button>
                      <Button
                        size="sm"
                        className="bg-yellow-500 hover:bg-yellow-600 text-white"
                        onClick={() => handleEditClick(todo)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDelete(todo.id)}
                      >
                        <Trash2 className="w-4 h-4" />
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
