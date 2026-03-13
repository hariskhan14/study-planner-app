import type { TodoCategory, TodoPriority, TodoFilterState } from '../../types/todo';
import { CATEGORY_CONFIG, PRIORITY_CONFIG } from '../../utils/constants';

interface TodoFiltersProps {
  filters: TodoFilterState;
  onFilterChange: (filters: TodoFilterState) => void;
}

export function TodoFilters({ filters, onFilterChange }: TodoFiltersProps) {
  const categories: (TodoCategory | 'all')[] = ['all', 'uni-work', 'personal', 'home', 'islamic'];
  const priorities: (TodoPriority | 'all')[] = ['all', 'urgent', 'normal', 'low'];

  return (
    <div className="space-y-3">
      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onFilterChange({ ...filters, category: cat })}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              filters.category === cat
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat === 'all' ? 'All' : CATEGORY_CONFIG[cat].label}
          </button>
        ))}
      </div>

      {/* Priority + completed toggle */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          {priorities.map((pri) => (
            <button
              key={pri}
              onClick={() => onFilterChange({ ...filters, priority: pri })}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                filters.priority === pri
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {pri === 'all' ? 'Any Priority' : PRIORITY_CONFIG[pri].label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.showCompleted}
            onChange={(e) => onFilterChange({ ...filters, showCompleted: e.target.checked })}
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          Done
        </label>
      </div>
    </div>
  );
}
