import React, { useState } from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import TaskCard from '../Shared/TaskCard';
import type { Status } from '../../types';

const KanbanView: React.FC = () => {
  const { tasks, collaborators, updateTaskStatus } = useTaskStore();
  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  
  const columns: { id: Status; title: string }[] = [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'in-review', title: 'In Review' },
    { id: 'done', title: 'Done' },
  ];
  
  const getTasksByStatus = (status: Status) => {
    return tasks.filter(task => task.status === status);
  };
  
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTask(taskId);
    e.dataTransfer.effectAllowed = 'move';
    if (e.dataTransfer.setDragImage) {
      e.dataTransfer.setDragImage(new Image(), 0, 0);
    }
  };
  
  const handleDragEnd = () => {
    setDraggedTask(null);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  
  const handleDrop = (e: React.DragEvent, newStatus: Status) => {
    e.preventDefault();
    if (draggedTask) {
      updateTaskStatus(draggedTask, newStatus);
      setDraggedTask(null);
    }
  };
  
  return (
    <div className="flex gap-4 overflow-x-auto p-4 h-full min-h-[600px]">
      {columns.map(column => {
        const columnTasks = getTasksByStatus(column.id);
        return (
          <div
            key={column.id}
            className="kanban-column flex flex-col"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-700">{column.title}</h3>
              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                {columnTasks.length}
              </span>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3">
              {columnTasks.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-sm">
                  No tasks
                </div>
              ) : (
                columnTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    collaborators={collaborators}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanView;