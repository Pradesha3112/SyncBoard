import type { Task, User, Priority, Status } from '../types';

const USERS: User[] = [
  { id: '1', name: 'Alice Chen', initials: 'AC', color: '#FF6B6B' },
  { id: '2', name: 'Bob Smith', initials: 'BS', color: '#4ECDC4' },
  { id: '3', name: 'Carol Davis', initials: 'CD', color: '#45B7D1' },
  { id: '4', name: 'David Wilson', initials: 'DW', color: '#96CEB4' },
  { id: '5', name: 'Emma Brown', initials: 'EB', color: '#FFEAA7' },
  { id: '6', name: 'Frank Miller', initials: 'FM', color: '#DDA0DD' },
];

const PRIORITIES: Priority[] = ['critical', 'high', 'medium', 'low'];
const STATUSES: Status[] = ['todo', 'in-progress', 'in-review', 'done'];

const TITLES = [
  'Implement authentication', 'Design system update', 'API integration',
  'User testing', 'Performance optimization', 'Bug fixes', 'Documentation',
  'Code review', 'Deployment setup', 'Database migration', 'UI improvements',
  'Security audit', 'Feature planning', 'Analytics implementation', 'Write tests',
  'Update documentation', 'Fix navigation bug', 'Add loading states', 'Improve SEO',
  'Mobile responsive design', 'Accessibility audit', 'Error handling', 'Logging setup'
];

const randomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const generateTasks = (count: number): Task[] => {
  const tasks: Task[] = [];
  const now = new Date();
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(now.getMonth() - 6);
  const sixMonthsLater = new Date(now);
  sixMonthsLater.setMonth(now.getMonth() + 6);

  for (let i = 0; i < count; i++) {
    const hasStartDate = Math.random() > 0.2;
    const startDate = hasStartDate ? randomDate(sixMonthsAgo, now) : null;
    const dueDate = startDate 
      ? randomDate(startDate, new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000))
      : randomDate(now, sixMonthsLater);
    
    tasks.push({
      id: `task-${i}`,
      title: TITLES[Math.floor(Math.random() * TITLES.length)] + ` ${i}`,
      status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
      priority: PRIORITIES[Math.floor(Math.random() * PRIORITIES.length)],
      assignee: USERS[Math.floor(Math.random() * USERS.length)],
      startDate: startDate,
      dueDate: dueDate,
      createdAt: randomDate(sixMonthsAgo, now),
    });
  }
  return tasks;
};