import React, { useState, useRef, useEffect } from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import type { Status } from '../../types';
import { formatDate, isOverdue, getPriorityColor } from '../../utils/dateUtils';

const ROW_HEIGHT = 70;
const BUFFER_SIZE = 5;

const ListView: React.FC = () => {
  const { filteredTasks, updateTaskStatus, sortField, sortDirection, setSort } = useTaskStore();
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const totalHeight = filteredTasks.length * ROW_HEIGHT;
  const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - BUFFER_SIZE);
  const endIndex = Math.min(
    filteredTasks.length,
    Math.ceil((scrollTop + (containerRef.current?.clientHeight || 0)) / ROW_HEIGHT) + BUFFER_SIZE
  );
  
  const visibleTasks = filteredTasks.slice(startIndex, endIndex);
  const offsetY = startIndex * ROW_HEIGHT;
  
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };
  
  const getSortIcon = (field: string) => {
    if (sortField !== field) return '↕️';
    return sortDirection === 'asc' ? '↑' : '↓';
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="grid grid-cols-12 gap-4 p-3 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700">
        <div className="col-span-4 cursor-pointer hover:text-blue-600" onClick={() => setSort('title')}>
          Title {getSortIcon('title')}
        </div>
        <div className="col-span-2 cursor-pointer hover:text-blue-600" onClick={() => setSort('priority')}>
          Priority {getSortIcon('priority')}
        </div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2">Assignee</div>
        <div className="col-span-2 cursor-pointer hover:text-blue-600" onClick={() => setSort('dueDate')}>
          Due Date {getSortIcon('dueDate')}
        </div>
      </div>
      
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="overflow-y-auto"
        style={{ height: '600px' }}
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          <div style={{ transform: `translateY(${offsetY}px)` }}>
            {visibleTasks.map((task) => {
              const isTaskOverdue = isOverdue(task.dueDate);
              return (
                <div
                  key={task.id}
                  className="grid grid-cols-12 gap-4 p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  style={{ height: ROW_HEIGHT }}
                >
                  <div className="col-span-4 font-medium text-gray-800 truncate">
                    {task.title}
                  </div>
                  <div className="col-span-2">
                    <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <select
                      value={task.status}
                      onChange={(e) => updateTaskStatus(task.id, e.target.value as Status)}
                      className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="in-review">In Review</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: task.assignee.color }}
                    >
                      {task.assignee.initials}
                    </div>
                    <span className="text-sm text-gray-600">{task.assignee.name}</span>
                  </div>
                  <div className={`col-span-2 text-sm ${isTaskOverdue ? 'text-red-500 font-semibold' : 'text-gray-500'}`}>
                    {formatDate(task.dueDate)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {filteredTasks.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No tasks found
        </div>
      )}
    </div>
  );
};

export default ListView;