import React, { useState } from 'react';
import { X, Save, Trash2, Copy, Play } from 'lucide-react';
import { Node } from 'reactflow';

interface NodeConfigPanelProps {
  node: Node | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (nodeId: string, data: any) => void;
  onDelete: (nodeId: string) => void;
  onDuplicate: (nodeId: string) => void;
  onExecute: (nodeId: string) => void;
}

const NodeConfigPanel: React.FC<NodeConfigPanelProps> = ({
  node,
  isOpen,
  onClose,
  onSave,
  onDelete,
  onDuplicate,
  onExecute,
}) => {
  const [formData, setFormData] = useState<any>({});

  React.useEffect(() => {
    if (node) {
      setFormData(node.data || {});
    }
  }, [node]);

  if (!isOpen || !node) return null;

  const handleSave = () => {
    onSave(node.id, formData);
  };

  const renderNodeConfig = () => {
    switch (node.type) {
      case 'trigger':
        return renderTriggerConfig();
      case 'action':
        return renderActionConfig();
      case 'logic':
        return renderLogicConfig();
      default:
        return <div>No configuration available</div>;
    }
  };

  const renderTriggerConfig = () => {
    if (formData.type === 'schedule') {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Cron Expression</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="0 */5 * * * *"
              value={formData.cron || ''}
              onChange={(e) => setFormData({ ...formData, cron: e.target.value })}
            />
            <p className="text-xs text-gray-500 mt-1">Run every 5 minutes</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Timezone</label>
            <select
              className="w-full px-3 py-2 border rounded-md"
              value={formData.timezone || 'UTC'}
              onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
              <option value="Europe/London">London</option>
              <option value="Asia/Tokyo">Tokyo</option>
            </select>
          </div>
        </div>
      );
    } else if (formData.type === 'webhook') {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">HTTP Method</label>
            <select
              className="w-full px-3 py-2 border rounded-md"
              value={formData.method || 'POST'}
              onChange={(e) => setFormData({ ...formData, method: e.target.value })}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Path</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="/webhook/my-workflow"
              value={formData.path || ''}
              onChange={(e) => setFormData({ ...formData, path: e.target.value })}
            />
          </div>
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.authentication || false}
                onChange={(e) => setFormData({ ...formData, authentication: e.target.checked })}
              />
              <span className="text-sm">Require authentication</span>
            </label>
          </div>
        </div>
      );
    }
    return <div>Manual trigger requires no configuration</div>;
  };

  const renderActionConfig = () => {
    if (formData.type === 'http') {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">URL</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="https://api.example.com/endpoint"
              value={formData.url || ''}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Method</label>
            <select
              className="w-full px-3 py-2 border rounded-md"
              value={formData.method || 'GET'}
              onChange={(e) => setFormData({ ...formData, method: e.target.value })}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Headers</label>
            <textarea
              className="w-full px-3 py-2 border rounded-md font-mono text-sm"
              rows={4}
              placeholder='{"Authorization": "Bearer token"}'
              value={formData.headers || ''}
              onChange={(e) => setFormData({ ...formData, headers: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Body</label>
            <textarea
              className="w-full px-3 py-2 border rounded-md font-mono text-sm"
              rows={6}
              placeholder='{"key": "value"}'
              value={formData.body || ''}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            />
          </div>
        </div>
      );
    } else if (formData.type === 'database' || formData.type === 'postgres' || formData.type === 'mysql') {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Operation</label>
            <select
              className="w-full px-3 py-2 border rounded-md"
              value={formData.operation || 'select'}
              onChange={(e) => setFormData({ ...formData, operation: e.target.value })}
            >
              <option value="select">Select</option>
              <option value="insert">Insert</option>
              <option value="update">Update</option>
              <option value="delete">Delete</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Table</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="users"
              value={formData.table || ''}
              onChange={(e) => setFormData({ ...formData, table: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Query</label>
            <textarea
              className="w-full px-3 py-2 border rounded-md font-mono text-sm"
              rows={4}
              placeholder="SELECT * FROM users WHERE active = true"
              value={formData.query || ''}
              onChange={(e) => setFormData({ ...formData, query: e.target.value })}
            />
          </div>
        </div>
      );
    } else if (formData.type === 'code') {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">JavaScript Code</label>
            <textarea
              className="w-full px-3 py-2 border rounded-md font-mono text-sm"
              rows={12}
              placeholder="// Available: $input, $output, $helpers&#10;&#10;const items = $input.all();&#10;&#10;return items.map(item => ({&#10;  ...item,&#10;  processed: true&#10;}));"
              value={formData.code || ''}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            />
          </div>
        </div>
      );
    }
    return <div>Configure {formData.type} settings</div>;
  };

  const renderLogicConfig = () => {
    if (formData.type === 'condition') {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Condition Type</label>
            <select
              className="w-full px-3 py-2 border rounded-md"
              value={formData.conditionType || 'value'}
              onChange={(e) => setFormData({ ...formData, conditionType: e.target.value })}
            >
              <option value="value">Value</option>
              <option value="expression">Expression</option>
              <option value="isEmpty">Is Empty</option>
              <option value="isNotEmpty">Is Not Empty</option>
            </select>
          </div>
          {formData.conditionType === 'value' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Field</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="status"
                  value={formData.field || ''}
                  onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Operator</label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.operator || 'equals'}
                  onChange={(e) => setFormData({ ...formData, operator: e.target.value })}
                >
                  <option value="equals">Equals</option>
                  <option value="notEquals">Not Equals</option>
                  <option value="contains">Contains</option>
                  <option value="greaterThan">Greater Than</option>
                  <option value="lessThan">Less Than</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Value</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="active"
                  value={formData.value || ''}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                />
              </div>
            </>
          )}
          {formData.conditionType === 'expression' && (
            <div>
              <label className="block text-sm font-medium mb-1">Expression</label>
              <textarea
                className="w-full px-3 py-2 border rounded-md font-mono text-sm"
                rows={4}
                placeholder="$input.item.price > 100 && $input.item.category === 'electronics'"
                value={formData.expression || ''}
                onChange={(e) => setFormData({ ...formData, expression: e.target.value })}
              />
            </div>
          )}
        </div>
      );
    }
    return <div>Configure logic settings</div>;
  };

  return (
    <div className="absolute top-0 right-0 h-full w-96 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-lg z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">{node.data.label}</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onExecute(node.id)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded transition-colors"
          >
            <Play className="w-4 h-4" />
            Execute
          </button>
          <button
            onClick={() => onDuplicate(node.id)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors"
          >
            <Copy className="w-4 h-4" />
            Duplicate
          </button>
          <button
            onClick={() => {
              onDelete(node.id);
              onClose();
            }}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Configuration Form */}
      <div className="flex-1 overflow-y-auto p-4">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Node Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.label || ''}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              className="w-full px-3 py-2 border rounded-md"
              rows={2}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Configuration</h4>
            {renderNodeConfig()}
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={handleSave}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Configuration
        </button>
      </div>
    </div>
  );
};

export default NodeConfigPanel;
