import { create } from 'zustand';
import type { Task, Filters, ViewType, SortField, SortDirection, CollaborativeUser } from '../types';
import { generateTasks } from '../utils/dataGenerator';

interface TaskStore {
  tasks: Task[];
  filteredTasks: Task[];
  view: ViewType;
  filters: Filters;
  sortField: SortField;
  sortDirection: SortDirection;
  collaborators: CollaborativeUser[];
  
  setView: (view: ViewType) => void;
  updateTaskStatus: (taskId: string, newStatus: Task['status']) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  updateCollaborator: (userId: string, updates: Partial<CollaborativeUser>) => void;
  setFilters: (filters: Partial<Filters>) => void;
  clearFilters: () => void;
  setSort: (field: SortField) => void;
  applyFiltersAndSort: () => void;
}

const initialFilters: Filters = {
  status: [],
  priority: [],
  assignees: [],
  dateRange: { from: null, to: null },
};

const initialTasks = generateTasks(500);

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: initialTasks,
  filteredTasks: initialTasks,
  view: 'kanban',
  filters: initialFilters,
  sortField: 'dueDate',
  sortDirection: 'asc',
  collaborators: [
    { id: 'user1', name: 'Sarah', color: '#FF6B6B', currentTaskId: null, isActive: true },
    { id: 'user2', name: 'Mike', color: '#4ECDC4', currentTaskId: null, isActive: true },
    { id: 'user3', name: 'Lisa', color: '#45B7D1', currentTaskId: null, isActive: true },
    { id: 'user4', name: 'John', color: '#96CEB4', currentTaskId: null, isActive: true },
  ],
  
  setView: (view) => set({ view }),
  
  updateTaskStatus: (taskId, newStatus) => {
    const { tasks, applyFiltersAndSort } = get();
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    set({ tasks: updatedTasks });
    applyFiltersAndSort();
  },
  
  updateTask: (taskId, updates) => {
    const { tasks, applyFiltersAndSort } = get();
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    );
    set({ tasks: updatedTasks });
    applyFiltersAndSort();
  },
  
  updateCollaborator: (userId, updates) => {
    const { collaborators } = get();
    const updatedCollaborators = collaborators.map(collab =>
      collab.id === userId ? { ...collab, ...updates } : collab
    );
    set({ collaborators: updatedCollaborators });
  },
  
  setFilters: (newFilters) => {
    const { filters } = get();
    set({ filters: { ...filters, ...newFilters } });
    get().applyFiltersAndSort();
  },
  
  clearFilters: () => {
    set({ filters: initialFilters });
    get().applyFiltersAndSort();
  },
  
  setSort: (field) => {
    const { sortField, sortDirection } = get();
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    set({ sortField: field, sortDirection: newDirection });
    get().applyFiltersAndSort();
  },
  
  applyFiltersAndSort: () => {
    const { tasks, filters, sortField, sortDirection } = get();
    
    let filtered = [...tasks];
    
    if (filters.status.length > 0) {
      filtered = filtered.filter(task => filters.status.includes(task.status));
    }
    
    if (filters.priority.length > 0) {
      filtered = filtered.filter(task => filters.priority.includes(task.priority));
    }
    
    if (filters.assignees.length > 0) {
      filtered = filtered.filter(task => filters.assignees.includes(task.assignee.id));
    }
    
    if (filters.dateRange.from) {
      filtered = filtered.filter(task => task.dueDate >= filters.dateRange.from!);
    }
    
    if (filters.dateRange.to) {
      filtered = filtered.filter(task => task.dueDate <= filters.dateRange.to!);
    }
    
    const priorityOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };
    
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'priority':
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case 'dueDate':
          comparison = a.dueDate.getTime() - b.dueDate.getTime();
          break;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    set({ filteredTasks: filtered });
  },
}));

setInterval(() => {
  const { tasks, collaborators, updateCollaborator } = useTaskStore.getState();
  if (tasks.length > 0 && collaborators.length > 0) {
    const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
    const randomCollaborator = collaborators[Math.floor(Math.random() * collaborators.length)];
    updateCollaborator(randomCollaborator.id, { currentTaskId: randomTask.id });
  }
}, 3000);