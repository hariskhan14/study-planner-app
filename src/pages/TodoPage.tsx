import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import type { TodoFilterState } from '../types/todo';
import { useTodos } from '../hooks/useTodos';
import { TodoList } from '../components/todo/TodoList';
import { TodoFilters } from '../components/todo/TodoFilters';
import { TodoForm } from '../components/todo/TodoForm';
import { scheduleNotification, cancelNotification } from '../services/notificationService';

export function TodoPage() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState<TodoFilterState>({
    category: 'all',
    priority: 'all',
    showCompleted: false,
  });

  // Schedule notifications for todos with due dates
  useEffect(() => {
    todos.forEach((todo) => {
      if (!todo.completed && todo.dueDate) {
        const due = new Date(todo.dueDate);
        // 10 min before
        scheduleNotification(
          `todo-${todo.id}-10m`,
          'Task Due in 10 minutes',
          todo.title,
          new Date(due.getTime() - 10 * 60 * 1000)
        );
        // 3 min before
        scheduleNotification(
          `todo-${todo.id}-3m`,
          'Task Due in 3 minutes!',
          todo.title,
          new Date(due.getTime() - 3 * 60 * 1000)
        );
        // 1 min before
        scheduleNotification(
          `todo-${todo.id}-1m`,
          'Task Due in 1 minute!',
          todo.title,
          new Date(due.getTime() - 1 * 60 * 1000)
        );
      }
    });
  }, [todos]);

  const handleDelete = (id: string) => {
    cancelNotification(`todo-${id}-10m`);
    cancelNotification(`todo-${id}-3m`);
    cancelNotification(`todo-${id}-1m`);
    deleteTodo(id);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Tasks</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-700 transition-colors"
        >
          <Plus size={16} />
          Add Task
        </button>
      </div>

      <TodoFilters filters={filters} onFilterChange={setFilters} />
      <TodoList
        todos={todos}
        filters={filters}
        onToggle={toggleTodo}
        onDelete={handleDelete}
      />

      {showForm && (
        <TodoForm onSubmit={addTodo} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}
