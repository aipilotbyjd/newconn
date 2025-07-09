import React, { useCallback, useState } from 'react';
import ReactFlow, {
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  ReactFlowInstance,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow';
import FlowSidebar from './FlowSidebar';
import TriggerNode from './nodes/TriggerNode';
import ActionNode from './nodes/ActionNode';
import LogicNode from './nodes/LogicNode';
import 'reactflow/dist/style.css';
import { useFlowStore } from '../store/flowStore';

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  logic: LogicNode,
};

const FlowCanvas: React.FC = () => {
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const { project } = useReactFlow();
  
  const nodes = useFlowStore((state) => state.nodes);
  const edges = useFlowStore((state) => state.edges);
  const onNodesChange = useFlowStore((state) => state.onNodesChange);
  const onEdgesChange = useFlowStore((state) => state.onEdgesChange);
  const onConnect = useFlowStore((state) => state.onConnect);
  const addNode = useFlowStore((state) => state.addNode);

  const onInit = useCallback((instance: ReactFlowInstance) => {
    setReactFlowInstance(instance);
    instance.fitView();
  }, []);

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();

    const reactFlowBounds = document
      .getElementById('reactflow-wrapper')
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

  return (
    <div className="flex w-full h-full">
      <FlowSidebar />
      <div id="reactflow-wrapper" className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={onInit}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          nodeTypes={nodeTypes}
        >
          <MiniMap />
          <Controls />
          <Background variant={BackgroundVariant.Dots} />
        </ReactFlow>
      </div>
    </div>
  );
};

const FlowBuilder: React.FC = () => {
  return (
    <ReactFlowProvider>
      <FlowCanvas />
    </ReactFlowProvider>
  );
};

export default FlowBuilder;
