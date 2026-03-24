import KanbanView from './components/Kanban/KanbanView';
import ListView from './components/List/ListView';
import { useTaskStore } from './store/useTaskStore';
import FiltersBar from './components/Filters/FilterBar';
import './index.css';
import TimelineView from './components/Timeline/TimelineView';

function App() {
  const { view, setView, filteredTasks, collaborators } = useTaskStore();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">SyncBoard</h1>
            
            <div className="flex gap-2">
              <button
                onClick={() => setView('kanban')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'kanban'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Kanban
              </button>
              <button
                onClick={() => setView('list')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'list'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setView('timeline')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'timeline'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Timeline
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {collaborators.map(user => (
                  <div
                    key={user.id}
                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: user.color }}
                    title={user.name}
                  >
                    {user.name[0]}
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {collaborators.length} people viewing
              </span>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            Total Tasks: {filteredTasks.length} | 
            Todo: {filteredTasks.filter(t => t.status === 'todo').length} | 
            In Progress: {filteredTasks.filter(t => t.status === 'in-progress').length} | 
            In Review: {filteredTasks.filter(t => t.status === 'in-review').length} | 
            Done: {filteredTasks.filter(t => t.status === 'done').length}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-8">
        <FiltersBar />
        
        {view === 'kanban' && <KanbanView />}
        {view === 'list' && <ListView />}
          {view === 'timeline' && <TimelineView />}
      
      </div>
    </div>
  );
}

export default App;