export type TodoCategory = 'uni-work' | 'personal' | 'home' | 'islamic';
export type TodoPriority = 'urgent' | 'normal' | 'low';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  category: TodoCategory;
  priority: TodoPriority;
  completed: boolean;
  createdAt: string;
}

export type TodoInput = Omit<Todo, 'id' | 'completed' | 'createdAt'>;

export interface TodoFilterState {
  category: TodoCategory | 'all';
  priority: TodoPriority | 'all';
  showCompleted: boolean;
}
