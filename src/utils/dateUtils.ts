export const formatDate = (date: Date): string => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const dueDate = new Date(date);
  
  if (dueDate.toDateString() === today.toDateString()) {
    return 'Due Today';
  }
  
  if (dueDate.toDateString() === tomorrow.toDateString()) {
    return 'Due Tomorrow';
  }
  
  const daysOverdue = Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
  if (daysOverdue > 7) {
    return `${daysOverdue} days overdue`;
  }
  
  if (daysOverdue > 0) {
    return `${daysOverdue} day${daysOverdue > 1 ? 's' : ''} overdue`;
  }
  
  return dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const isOverdue = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = new Date(date);
  dueDate.setHours(0, 0, 0, 0);
  return dueDate < today;
};

export const getPriorityColor = (priority: string): string => {
  const colors: Record<string, string> = {
    critical: 'bg-red-500 text-white',
    high: 'bg-orange-500 text-white',
    medium: 'bg-yellow-500 text-white',
    low: 'bg-green-500 text-white',
  };
  return colors[priority] || 'bg-gray-500 text-white';
};