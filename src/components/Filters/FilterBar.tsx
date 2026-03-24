import React, { useEffect } from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import type { Status, Priority } from '../../types';
import { useSearchParams } from 'react-router-dom';

const FiltersBar: React.FC = () => {
  const { filters, setFilters, clearFilters } = useTaskStore();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const statuses: Status[] = ['todo', 'in-progress', 'in-review', 'done'];
  const priorities: Priority[] = ['critical', 'high', 'medium', 'low'];
  const assignees = ['Alice Chen', 'Bob Smith', 'Carol Davis', 'David Wilson', 'Emma Brown', 'Frank Miller'];
  
  useEffect(() => {
    const urlFilters: any = {};
    const statusParam = searchParams.get('status');
    if (statusParam) urlFilters.status = statusParam.split(',');
    
    const priorityParam = searchParams.get('priority');
    if (priorityParam) urlFilters.priority = priorityParam.split(',');
    
    const assigneesParam = searchParams.get('assignees');
    if (assigneesParam) urlFilters.assignees = assigneesParam.split(',');
    
    if (Object.keys(urlFilters).length > 0) {
      setFilters(urlFilters);
    }
  }, []);
  
  useEffect(() => {
    const params: any = {};
    if (filters.status.length > 0) params.status = filters.status.join(',');
    if (filters.priority.length > 0) params.priority = filters.priority.join(',');
    if (filters.assignees.length > 0) params.assignees = filters.assignees.join(',');
    setSearchParams(params);
  }, [filters, setSearchParams]);
  
  const toggleFilter = (type: keyof typeof filters, value: string) => {
    const current = filters[type] as string[];
    const newValue = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    setFilters({ [type]: newValue });
  };
  
  const hasActiveFilters = filters.status.length > 0 || filters.priority.length > 0 || filters.assignees.length > 0;
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-700">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Clear All Filters
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
          <div className="flex flex-wrap gap-2">
            {statuses.map(status => (
              <button
                key={status}
                onClick={() => toggleFilter('status', status)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  filters.status.includes(status)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Priority</label>
          <div className="flex flex-wrap gap-2">
            {priorities.map(priority => (
              <button
                key={priority}
                onClick={() => toggleFilter('priority', priority)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  filters.priority.includes(priority)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {priority}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Assignee</label>
          <div className="flex flex-wrap gap-2">
            {assignees.map(assignee => (
              <button
                key={assignee}
                onClick={() => toggleFilter('assignees', assignee)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  filters.assignees.includes(assignee)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {assignee.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersBar;