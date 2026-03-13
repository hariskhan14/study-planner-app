import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Todo, TodoInput } from '../types/todo';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '../utils/constants';

export function useTodos() {
  const [todos, setTodos] = useLocalStorage<Todo[]>(STORAGE_KEYS.TODOS, []);

  const addTodo = useCallback((input: TodoInput) => {
    const newTodo: Todo = {
      ...input,
      id: uuidv4(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos(prev => [newTodo, ...prev]);
  }, [setTodos]);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, [setTodos]);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }, [setTodos]);

  const updateTodo = useCallback((id: string, input: Partial<TodoInput>) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, ...input } : t))
    );
  }, [setTodos]);

  return { todos, addTodo, toggleTodo, deleteTodo, updateTodo };
}
