import React, { useRef, useState } from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import { getPriorityColor } from '../../utils/dateUtils';

const TimelineView: React.FC = () => {
  const { filteredTasks } = useTaskStore();
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Get date range for current month
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
  const dayWidth = 80; // pixels per day
  const totalDays = Math.ceil((endOfMonth.getTime() - startOfMonth.getTime()) / (1000 * 60 * 60 * 24));
  const totalWidth = totalDays * dayWidth;
  
  const getTaskPosition = (dueDate: Date, startDate: Date | null) => {
    const taskStart = startDate || dueDate;
    const left = Math.max(0, (taskStart.getTime() - startOfMonth.getTime()) / (1000 * 60 * 60 * 24) * dayWidth);
    const width = ((dueDate.getTime() - taskStart.getTime()) / (1000 * 60 * 60 * 24) + 1) * dayWidth;
    return { left, width: Math.max(dayWidth, width) };
  };
  
  const todayPosition = ((today.getTime() - startOfMonth.getTime()) / (1000 * 60 * 60 * 24)) * dayWidth;
  
  const days = [];
  for (let i = 0; i <= totalDays; i++) {
    const date = new Date(startOfMonth);
    date.setDate(startOfMonth.getDate() + i);
    days.push(date);
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-700">Timeline View - {startOfMonth.toLocaleDateString()} to {endOfMonth.toLocaleDateString()}</h3>
      </div>
      
      <div
        ref={containerRef}
        className="overflow-x-auto"
        style={{ maxHeight: '600px', overflowY: 'auto' }}
      >
        <div style={{ width: totalWidth + 200, position: 'relative' }}>
          {/* Header - Days */}
          <div className="sticky top-0 bg-gray-50 border-b border-gray-200 z-10">
            <div className="flex" style={{ marginLeft: '200px' }}>
              {days.map((day, idx) => (
                <div
                  key={idx}
                  className="text-xs text-gray-500 border-l border-gray-200"
                  style={{ width: dayWidth, padding: '8px 4px', textAlign: 'center' }}
                >
                  {day.getDate()}
                  <br />
                  {day.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
              ))}
            </div>
          </div>
          
          {/* Tasks */}
          <div>
            {filteredTasks.map((task) => {
              const { left, width } = getTaskPosition(task.dueDate, task.startDate);
              const priorityClass = getPriorityColor(task.priority).split(' ')[0];
              
              return (
                <div key={task.id} className="flex border-b border-gray-100 hover:bg-gray-50">
                  {/* Task Info */}
                  <div className="w-[200px] p-2 flex-shrink-0">
                    <div className="font-medium text-sm truncate">{task.title}</div>
                    <div className="text-xs text-gray-500">{task.assignee.name}</div>
                    <span className={`text-xs px-1 py-0.5 rounded ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  
                  {/* Timeline Bar */}
                  <div className="relative flex-1" style={{ height: '60px' }}>
                    <div
                      className={`absolute rounded-full ${priorityClass} text-white text-xs flex items-center justify-center px-2`}
                      style={{
                        left: left,
                        width: width,
                        top: '10px',
                        height: '40px',
                        backgroundColor: task.priority === 'critical' ? '#ef4444' : 
                                       task.priority === 'high' ? '#f97316' :
                                       task.priority === 'medium' ? '#eab308' : '#22c55e',
                        opacity: 0.8,
                      }}
                    >
                      {task.startDate ? '▬' : '●'} {task.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Today Line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-20"
            style={{ left: todayPosition + 200, pointerEvents: 'none' }}
          >
            <div className="absolute -top-1 -left-2 text-xs text-red-500 font-bold">Today</div>
          </div>
        </div>
      </div>
      
      {filteredTasks.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No tasks to display in timeline
        </div>
      )}
    </div>
  );
};

export default TimelineView;