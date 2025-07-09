import React from 'react';
import { Play, Save, ChevronDown, Settings, Share2, MoreVertical, GitBranch } from 'lucide-react';

interface WorkflowHeaderProps {
  workflowName: string;
  onWorkflowNameChange?: (name: string) => void;
  onSave?: () => void;
  onExecute?: () => void;
}

const WorkflowHeader: React.FC<WorkflowHeaderProps> = ({ 
  workflowName = 'My workflow',
  onWorkflowNameChange,
  onSave,
  onExecute 
}) => {
  return (
    <div className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
          <ChevronDown className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={workflowName}
            onChange={(e) => onWorkflowNameChange?.(e.target.value)}
            className="text-lg font-medium bg-transparent border-none outline-none focus:ring-2 focus:ring-orange-500 rounded px-2 py-1"
            placeholder="Workflow name"
          />
          <span className="text-xs px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded">
            Active
          </span>
        </div>
      </div>

      {/* Center section */}
      <div className="flex items-center gap-2">
        <button
          onClick={onExecute}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-medium transition-colors"
        >
          <Play className="w-4 h-4" />
          Execute Workflow
        </button>
        
        <button
          onClick={onSave}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md font-medium transition-colors"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
          <GitBranch className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
          <Share2 className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
          <Settings className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default WorkflowHeader;
