import React from 'react';
import { X, Clock, CheckCircle, XCircle, AlertCircle, Loader2, ChevronRight, ChevronDown } from 'lucide-react';

interface ExecutionLog {
  nodeId: string;
  nodeName: string;
  status: 'pending' | 'running' | 'success' | 'error';
  startTime?: Date;
  endTime?: Date;
  duration?: number;
  input?: any;
  output?: any;
  error?: string;
}

interface ExecutionPanelProps {
  isOpen: boolean;
  onClose: () => void;
  executionId?: string;
  status?: 'idle' | 'running' | 'completed' | 'failed';
  logs: ExecutionLog[];
}

const ExecutionPanel: React.FC<ExecutionPanelProps> = ({
  isOpen,
  onClose,
  executionId,
  status = 'idle',
  logs = [],
}) => {
  const [expandedNodes, setExpandedNodes] = React.useState<Set<string>>(new Set());

  if (!isOpen) return null;

  const toggleNodeExpansion = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const getStatusIcon = (status: ExecutionLog['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-gray-400" />;
      case 'running':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getOverallStatusDisplay = () => {
    switch (status) {
      case 'idle':
        return { text: 'Ready', className: 'text-gray-600', icon: <Clock className="w-5 h-5" /> };
      case 'running':
        return { text: 'Running', className: 'text-blue-600', icon: <Loader2 className="w-5 h-5 animate-spin" /> };
      case 'completed':
        return { text: 'Completed', className: 'text-green-600', icon: <CheckCircle className="w-5 h-5" /> };
      case 'failed':
        return { text: 'Failed', className: 'text-red-600', icon: <XCircle className="w-5 h-5" /> };
      default:
        return { text: 'Unknown', className: 'text-gray-600', icon: <AlertCircle className="w-5 h-5" /> };
    }
  };

  const statusDisplay = getOverallStatusDisplay();

  return (
    <div className="absolute bottom-0 left-0 right-0 h-96 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg z-40 flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold">Execution</h3>
          {executionId && (
            <span className="text-sm text-gray-500">#{executionId}</span>
          )}
          <div className={`flex items-center gap-2 ${statusDisplay.className}`}>
            {statusDisplay.icon}
            <span className="text-sm font-medium">{statusDisplay.text}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {logs.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No execution data yet</p>
              <p className="text-sm mt-1">Run the workflow to see execution details</p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {logs.map((log, index) => {
              const isExpanded = expandedNodes.has(log.nodeId);
              return (
                <div key={`${log.nodeId}-${index}`} className="px-4 py-3">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleNodeExpansion(log.nodeId)}
                  >
                    <div className="flex items-center gap-3">
                      <button className="p-0.5">
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                      {getStatusIcon(log.status)}
                      <span className="font-medium">{log.nodeName}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      {log.duration && (
                        <span>{log.duration}ms</span>
                      )}
                      {log.startTime && (
                        <span>{new Date(log.startTime).toLocaleTimeString()}</span>
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-3 ml-8 space-y-3">
                      {log.error && (
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-md">
                          <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">Error</p>
                          <pre className="text-xs text-red-700 dark:text-red-300 overflow-x-auto">
                            {log.error}
                          </pre>
                        </div>
                      )}

                      {log.input && (
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Input</p>
                          <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto">
                            {JSON.stringify(log.input, null, 2)}
                          </pre>
                        </div>
                      )}

                      {log.output && (
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Output</p>
                          <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto">
                            {JSON.stringify(log.output, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExecutionPanel;
