import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from 'date-fns';

function TodoList({ todos, onUpdate, onDelete }) {
  const [editingTodo, setEditingTodo] = useState(null);

  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  const handleUpdateTodo = (e) => {
    e.preventDefault();
    onUpdate(editingTodo);
    setEditingTodo(null);
  };

  return (
    <div className="space-y-4">
      {todos.map(todo => (
        <div
          key={todo.id}
          className={`flex items-center gap-4 p-4 rounded-lg border ${
            todo.completed ? 'bg-gray-50' : 'bg-white'
          }`}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onUpdate({...todo, completed: !todo.completed})}
            className="h-5 w-5"
            disabled={todo.completed}
          />
          <div className="flex-1">
            <p className={`font-medium ${todo.completed ? 'line-through text-gray-500' : ''}`}>
              {todo.text}
            </p>
            <div className="flex gap-2 text-sm text-gray-500">
              <span>{todo.category}</span>
              <span>•</span>
              <span className={`
                ${todo.priority === 'high' ? 'text-red-500' : ''}
                ${todo.priority === 'medium' ? 'text-yellow-500' : ''}
                ${todo.priority === 'low' ? 'text-green-500' : ''}
              `}>
                {todo.priority}
              </span>
              <span>•</span>
              <span>{format(new Date(todo.dueDate), 'MMM d, yyyy')}</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEdit(todo)}
            disabled={todo.completed}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(todo.id)}
          >
            Delete
          </Button>
        </div>
      ))}

      <Dialog open={!!editingTodo} onOpenChange={() => setEditingTodo(null)}>
        {editingTodo && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Todo</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdateTodo} className="space-y-4 p-4">
              <Input
                value={editingTodo.text}
                onChange={(e) => setEditingTodo({
                  ...editingTodo,
                  text: e.target.value
                })}
              />
              <Select
                value={editingTodo.category}
                onValueChange={(value) => setEditingTodo({
                  ...editingTodo,
                  category: value
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                value={editingTodo.priority}
                onValueChange={(value) => setEditingTodo({
                  ...editingTodo,
                  priority: value
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Calendar
                mode="single"
                selected={new Date(editingTodo.dueDate)}
                onSelect={(date) => setEditingTodo({
                  ...editingTodo,
                  dueDate: date.toISOString()
                })}
                className="rounded-md border"
              />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingTodo(null)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Save Changes
                </Button>
              </div>
            </form>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

export default TodoList;