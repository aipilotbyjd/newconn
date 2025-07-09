import React, { useCallback, useState } from 'react';
import ReactFlow, {
  Controls,
  Background,
  ReactFlowInstance,
  ReactFlowProvider,
  useReactFlow,
  Panel,
  getRectOfNodes,
  getTransformForBounds,
} from 'reactflow';
import { toPng } from 'html-to-image';
import { Plus, ZoomIn, ZoomOut, Maximize2, Download, Play } from 'lucide-react';
import { Node } from 'reactflow';
import NodeSidebar from './NodeSidebar';
import TriggerNode from '../nodes/TriggerNode';
import ActionNode from '../nodes/ActionNode';
import LogicNode from '../nodes/LogicNode';
import NodeConfigPanel from './NodeConfigPanel';
import ExecutionPanel from './ExecutionPanel';
import { useFlowStore } from '../../store/flowStore';
import 'reactflow/dist/style.css';

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

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  logic: LogicNode,
};

const proOptions = { hideAttribution: true };

const WorkflowCanvasContent: React.FC = () => {
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { project, getNodes, setNodes } = useReactFlow();
  
  const nodes = useFlowStore((state) => state.nodes);
  const edges = useFlowStore((state) => state.edges);
  const onNodesChange = useFlowStore((state) => state.onNodesChange);
  const onEdgesChange = useFlowStore((state) => state.onEdgesChange);
  const onConnect = useFlowStore((state) => state.onConnect);
  const addNode = useFlowStore((state) => state.addNode);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [executionLogs, setExecutionLogs] = useState<ExecutionLog[]>([]);
  const [executionStatus, setExecutionStatus] = useState<'idle' | 'running' | 'completed' | 'failed'>('idle');
  const [isExecutionPanelOpen, setIsExecutionPanelOpen] = useState(false);

  const updateNodeData = (nodeId: string, data: any) => {
    setNodes((nds) => nds.map(node => node.id === nodeId ? { ...node, data: {...node.data, ...data} } : node));
  };

  const deleteNode = (nodeId: string) => {
    setNodes((nds) => nds.filter(node => node.id !== nodeId));
  };

  const duplicateNode = (nodeId: string) => {
    const nodeToDuplicate = nodes.find(node => node.id === nodeId);
    if (nodeToDuplicate) {
      const newNode = {
        ...nodeToDuplicate,
        id: `${nodeToDuplicate.type}-${Date.now()}`,
        position: {
          x: nodeToDuplicate.position.x + 20,
          y: nodeToDuplicate.position.y + 20,
        },
      };
      addNode(newNode);
    }
  };

  const executeNode = (nodeId: string) => {
    const nodeToExecute = nodes.find(node => node.id === nodeId);
    if (nodeToExecute) {
      setExecutionLogs((logs) => [...logs, {
        nodeId,
        nodeName: nodeToExecute.data.label,
        status: 'running' as const,
      }]);
      // Simulate execution
      setTimeout(() => {
        if (Math.random() > 0.5) {
          setExecutionLogs((logs) => logs.map(
            log => log.nodeId === nodeId ? { ...log, status: 'success' as const, duration: 500 } : log
          ));
        } else {
          setExecutionLogs((logs) => logs.map(
            log => log.nodeId === nodeId ? { ...log, status: 'error' as const, duration: 500, error: 'Random failure occurred.' } : log
          ));
        }
      }, 500);
    }
  };

  const onInit = useCallback((instance: ReactFlowInstance) => {
    setReactFlowInstance(instance);
  }, []);

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();

    const reactFlowBounds = document
      .querySelector('.react-flow__wrapper')
      ?.getBoundingClientRect();
      
    if (!reactFlowBounds) return;
      
    const typeString = event.dataTransfer.getData('application/reactflow');
    
    if (!typeString) return;
    
    try {
      const nodeTemplate = JSON.parse(typeString);

      // check if the dropped element is valid
      if (!nodeTemplate || typeof nodeTemplate !== 'object') {
        return;
      }

      const position = project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: `${nodeTemplate.type}-${Date.now()}`,
        type: nodeTemplate.type,
        position,
        data: {
          label: nodeTemplate.label,
          description: nodeTemplate.description,
          ...nodeTemplate.data,
        },
      };

      addNode(newNode);
    } catch (e) {
      console.error('Failed to parse dropped node:', e);
    }
  }, [project, addNode]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const downloadImage = useCallback(() => {
    if (!reactFlowInstance) return;

    const nodesBounds = getRectOfNodes(getNodes());
    const imageWidth = nodesBounds.width + 100;
    const imageHeight = nodesBounds.height + 100;
    const transform = getTransformForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2,
    );

    const viewport = document.querySelector('.react-flow__viewport') as HTMLElement;

    toPng(viewport, {
      backgroundColor: '#fafafa',
      width: imageWidth,
      height: imageHeight,
      style: {
        width: `${imageWidth}px`,
        height: `${imageHeight}px`,
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
    }).then((dataUrl) => {
      const a = document.createElement('a');
      a.setAttribute('download', 'workflow.png');
      a.setAttribute('href', dataUrl);
      a.click();
    });
  }, [reactFlowInstance, getNodes]);

  return (
    <div className="relative w-full h-full bg-gray-50 dark:bg-gray-950">
      <NodeSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <NodeConfigPanel 
        node={selectedNode} 
        isOpen={Boolean(selectedNode)} 
        onClose={() => setSelectedNode(null)}
        onSave={updateNodeData}
        onDelete={deleteNode}
        onDuplicate={duplicateNode}
        onExecute={executeNode}
      />

      <ExecutionPanel
        isOpen={isExecutionPanelOpen}
        onClose={() => setIsExecutionPanelOpen(false)}
        status={executionStatus}
        logs={executionLogs}
      />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        onNodeClick={(event, node) => setSelectedNode(node)}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: false,
          style: {
            stroke: '#9CA3AF',
            strokeWidth: 2,
          },
        }}
        connectionLineStyle={{
          stroke: '#9CA3AF',
          strokeWidth: 2,
        }}
        fitView
      >
        <Background color="#e5e7eb" gap={20} />
        
        {/* Custom Controls */}
        <Panel position="bottom-left" className="flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg m-4">
          <button
            onClick={() => reactFlowInstance?.zoomIn()}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => reactFlowInstance?.zoomOut()}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => reactFlowInstance?.fitView()}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            title="Fit view"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
          <button
            onClick={() => setIsExecutionPanelOpen(true)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            title="Show Execution Panel"
          >
            <Play className="w-4 h-4" />
          </button>
          <button
            onClick={downloadImage}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            title="Download as image"
          >
            <Download className="w-4 h-4" />
          </button>
        </Panel>

        {/* Add Node Button */}
        <Panel position="top-center" className="m-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add node
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
};

const WorkflowCanvas: React.FC = () => {
  return (
    <ReactFlowProvider>
      <WorkflowCanvasContent />
    </ReactFlowProvider>
  );
};

export default WorkflowCanvas;
