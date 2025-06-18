// src/components/todo-form.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Check, X } from "lucide-react";
import type { TodoFormData } from "@/types/todo";

interface TodoFormProps {
  onAdd: (todo: TodoFormData) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      description: description.trim() || undefined,
      completed: false,
    });

    setTitle("");
    setDescription("");
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setTitle("");
    setDescription("");
  };

  if (!isOpen) {
    return (
      <div className="mb-6">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 flex items-center gap-2 shadow"
        >
          <Plus className="w-4 h-4" />
          Add New Todo
        </Button>
      </div>
    );
  }

  return (
    <Card className="mb-6 border border-gray-200 shadow-sm bg-gray-50">
      <CardHeader className="border-b border-gray-200 bg-white rounded-t-xl">
        <CardTitle className="text-lg font-semibold text-gray-800">Add New Todo</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 p-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <Input
            placeholder="e.g., Buy groceries"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            className="rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <Textarea
            placeholder="Optional description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex gap-3 justify-end pt-2">
          <Button
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            <Check className="w-4 h-4 mr-2" />
            Add Todo
          </Button>

          <Button
            variant="outline"
            onClick={handleCancel}
            className="border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
