# SyncBoard - Project Management Tool

A full-featured project management application with Kanban board, sortable list view, and timeline Gantt chart. Built with React, TypeScript, and Tailwind CSS.

## 📋 Features

### Three Views
- **Kanban Board**: Drag-and-drop tasks between columns (To Do, In Progress, In Review, Done)
- **List View**: Sortable table with virtual scrolling for 500+ tasks
- **Timeline View**: Gantt chart with horizontal scrolling and today marker

### Custom Drag-and-Drop
- Built from scratch using native HTML5 Drag and Drop API
- Visual feedback during drag (opacity, shadow)
- Valid drop zones highlighted
- Smooth snap-back animation

### Virtual Scrolling
- Manual implementation for List View
- Renders only visible rows + 5 buffer
- Smooth scrolling with 500+ tasks
- No performance degradation

### Live Collaboration
- Simulated real-time presence
- Avatar indicators on tasks
- Shows which users are viewing each task
- Updates every 3 seconds

### Advanced Filtering
- Filter by status, priority, and assignee
- URL parameter synchronization
- Shareable filtered views
- Clear all filters option

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Build Tool**: Vite
- **Routing**: React Router DOM

## 📦 Installation

```bash
# Clone the repository
git clone [your-repo-url]

# Install dependencies
npm install

# Start development server
npm run dev
```
## Project Structure
```bash
src/
├── components/
│   ├── Kanban/        # Kanban board view
│   ├── List/          # List view with virtual scrolling
│   ├── Timeline/      # Gantt chart view
│   ├── Filters/       # Filter bar component
│   └── Shared/        # Reusable components
├── store/             # Zustand state management
├── types/             # TypeScript type definitions
├── utils/             # Helper functions
└── App.tsx            # Main application
```
