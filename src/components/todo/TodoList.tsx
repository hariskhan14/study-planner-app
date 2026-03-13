import type { Todo, TodoFilterState } from '../../types/todo';
import { TodoItem } from './TodoItem';
import { ListTodo } from 'lucide-react';

interface TodoListProps {
  todos: Todo[];
  filters: TodoFilterState;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function filterAndSort(todos: Todo[], filters: TodoFilterState): Todo[] {
  const priorityOrder = { urgent: 0, normal: 1, low: 2 };

  return todos
    .filter((t) => {
      if (!filters.showCompleted && t.completed) return false;
      if (filters.category !== 'all' && t.category !== filters.category) return false;
      if (filters.priority !== 'all' && t.priority !== filters.priority) return false;
      return true;
    })
    .sort((a, b) => {
      // Completed items go to the bottom
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      // Then sort by priority
      const priDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priDiff !== 0) return priDiff;
      // Then by due date
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
}

export function TodoList({ todos, filters, onToggle, onDelete }: TodoListProps) {
  const filtered = filterAndSort(todos, filters);

  if (filtered.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <ListTodo size={40} className="mx-auto mb-3 opacity-50" />
        <p className="font-medium">No tasks yet</p>
        <p className="text-sm mt-1">Tap + to add your first task</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {filtered.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
