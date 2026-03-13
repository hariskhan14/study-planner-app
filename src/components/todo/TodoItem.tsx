import { Check, Circle, Trash2 } from 'lucide-react';
import type { Todo } from '../../types/todo';
import { CATEGORY_CONFIG, PRIORITY_CONFIG } from '../../utils/constants';
import { CountdownBadge } from './CountdownBadge';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const cat = CATEGORY_CONFIG[todo.category];
  const pri = PRIORITY_CONFIG[todo.priority];

  return (
    <div
      className={`bg-white border border-gray-100 rounded-xl p-4 transition-all ${
        todo.completed ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(todo.id)}
          className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
            todo.completed
              ? 'bg-primary-500 text-white'
              : 'border-2 border-gray-300 text-gray-300 hover:border-primary-400'
          }`}
        >
          {todo.completed ? <Check size={14} /> : <Circle size={14} />}
        </button>

        <div className="flex-1 min-w-0">
          <p className={`font-medium text-sm ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
            {todo.title}
          </p>
          {todo.description && (
            <p className="text-xs text-gray-400 mt-0.5 truncate">{todo.description}</p>
          )}
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cat.bg} ${cat.color}`}>
              {cat.label}
            </span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${pri.bg} ${pri.color}`}>
              {pri.label}
            </span>
            {!todo.completed && todo.dueDate && (
              <CountdownBadge dueDate={todo.dueDate} />
            )}
          </div>
        </div>

        <button
          onClick={() => onDelete(todo.id)}
          className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
