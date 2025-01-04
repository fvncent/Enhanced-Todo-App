import { useState } from 'react';
import { Button } from "@/components/ui/button";
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

function TodoForm({ onAdd }) {
  // This state holds temporary data while the user is filling out the form. or the
  // Initial State:
  const [formData, setFormData] = useState({
    text: '',
    category: 'personal',
    priority: 'medium',
    dueDate: new Date().toISOString()
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.text.trim()) {
      onAdd(formData); // Send data to App component

      // Reset form
      setFormData({
        text: '',
        category: 'personal',
        priority: 'medium',
        dueDate: new Date().toISOString()
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div className="flex gap-4">
        <Input
          type="text"
          value={formData.text} // Display current text value
          onChange={(e) => setFormData({...formData, // Keep all other values
                                        text: e.target.value})} // Update only the text
          placeholder="What needs to be done?"
          className="flex-1"
        />
        <Select
          value={formData.category} // Display current category
          onValueChange={(value) => setFormData({...formData, // Keep all other values
                                                 category: value})} // Update only the category
        >
          <SelectTrigger className="w-40">
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
          value={formData.priority}
          onValueChange={(value) => setFormData({...formData, priority: value})}
        >
          <SelectTrigger className="w-40">
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
          selected={new Date(formData.dueDate)}
          onSelect={(date) => setFormData({...formData, dueDate: date.toISOString()})}
          className="rounded-md border"
        />
        <Button type="submit">Add Todo</Button>
      </div>
    </form>
  );
}

export default TodoForm;