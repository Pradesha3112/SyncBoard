export type Priority = 'critical' | 'high' | 'medium' | 'low';
export type Status = 'todo' | 'in-progress' | 'in-review' | 'done';

export interface User {
  id: string;
  name: string;
  initials: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  assignee: User;
  startDate: Date | null;
  dueDate: Date;
  createdAt: Date;
}

export interface CollaborativeUser {
  id: string;
  name: string;
  color: string;
  currentTaskId: string | null;
  isActive: boolean;
}

export interface Filters {
  status: Status[];
  priority: Priority[];
  assignees: string[];
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
}

export type ViewType = 'kanban' | 'list' | 'timeline';
export type SortField = 'title' | 'priority' | 'dueDate';
export type SortDirection = 'asc' | 'desc';