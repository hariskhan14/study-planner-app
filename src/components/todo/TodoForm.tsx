import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import type { TodoInput, TodoCategory, TodoPriority } from '../../types/todo';
import { CATEGORY_CONFIG, PRIORITY_CONFIG } from '../../utils/constants';

interface TodoFormProps {
  onSubmit: (input: TodoInput) => void;
  onClose: () => void;
}

export function TodoForm({ onSubmit, onClose }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [category, setCategory] = useState<TodoCategory>('personal');
  const [priority, setPriority] = useState<TodoPriority>('normal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const dueDateISO = dueDate && dueTime
      ? new Date(`${dueDate}T${dueTime}`).toISOString()
      : dueDate
      ? new Date(`${dueDate}T23:59`).toISOString()
      : new Date().toISOString();

    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      dueDate: dueDateISO,
      category,
      priority,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">New Task</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Task title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />

          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Due Time</label>
              <input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">Category</label>
            <div className="flex gap-2 flex-wrap">
              {(Object.entries(CATEGORY_CONFIG) as [TodoCategory, typeof CATEGORY_CONFIG[TodoCategory]][]).map(
                ([key, config]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCategory(key)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      category === key
                        ? `${config.bg} ${config.color} ring-2 ring-offset-1 ring-current`
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {config.label}
                  </button>
                )
              )}
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">Priority</label>
            <div className="flex gap-2">
              {(Object.entries(PRIORITY_CONFIG) as [TodoPriority, typeof PRIORITY_CONFIG[TodoPriority]][]).map(
                ([key, config]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setPriority(key)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      priority === key
                        ? `${config.bg} ${config.color} ring-2 ring-offset-1 ring-current`
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {config.label}
                  </button>
                )
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors"
          >
            <Plus size={18} />
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
