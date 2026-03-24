import React from 'react';
import type { Task, CollaborativeUser } from '../../types';
import { formatDate, isOverdue, getPriorityColor } from '../../utils/dateUtils';

interface TaskCardProps {
  task: Task;
  collaborators?: CollaborativeUser[];
  onDragStart?: (e: React.DragEvent, taskId: string) => void;
  onDragEnd?: (e: React.DragEvent) => void;
  draggable?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  collaborators = [], 
  onDragStart, 
  onDragEnd, 
  draggable = true 
}) => {
  const viewers = collaborators.filter(c => c.currentTaskId === task.id);
  const isTaskOverdue = isOverdue(task.dueDate);
  
  return (
    <div
      draggable={draggable}
      onDragStart={(e) => onDragStart?.(e, task.id)}
      onDragEnd={onDragEnd}
      className="card p-4 mb-3 cursor-move hover:shadow-md transition-all"
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-gray-800 text-sm">{task.title}</h4>
        <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
      </div>
      
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center space-x-2">
          <div 
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ backgroundColor: task.assignee.color }}
          >
            {task.assignee.initials}
          </div>
          <span className="text-xs text-gray-600">{task.assignee.name}</span>
        </div>
        
        <div className={`text-xs ${isTaskOverdue ? 'text-red-500 font-semibold' : 'text-gray-500'}`}>
          {formatDate(task.dueDate)}
        </div>
      </div>
      
      {viewers.length > 0 && (
        <div className="mt-2 flex items-center space-x-1">
          {viewers.slice(0, 3).map((viewer, idx) => (
            <div
              key={viewer.id}
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white border border-white"
              style={{ backgroundColor: viewer.color, zIndex: viewers.length - idx }}
              title={viewer.name}
            >
              {viewer.name[0]}
            </div>
          ))}
          {viewers.length > 3 && (
            <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center text-[10px] font-bold">
              +{viewers.length - 3}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskCard;