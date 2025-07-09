'use client';

import React, { useState } from 'react';
import WorkflowHeader from '@/components/workflow/WorkflowHeader';
import WorkflowCanvas from '@/components/workflow/WorkflowCanvas';
import { useFlowStore } from '@/store/flowStore';

const WorkflowEditor = () => {
  const [workflowName, setWorkflowName] = useState('My workflow');
  const [isExecuting, setIsExecuting] = useState(false);
  
  const nodes = useFlowStore((state) => state.nodes);
  const edges = useFlowStore((state) => state.edges);

  const handleSave = () => {
    // Create workflow object
    const workflow = {
      name: workflowName,
      nodes: nodes,
      edges: edges,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Save to localStorage for now (you can replace with API call)
    const workflows = JSON.parse(localStorage.getItem('workflows') || '[]');
    const existingIndex = workflows.findIndex((w: any) => w.name === workflowName);
    
    if (existingIndex >= 0) {
      workflows[existingIndex] = workflow;
    } else {
      workflows.push(workflow);
    }
    
    localStorage.setItem('workflows', JSON.stringify(workflows));
    console.log('Workflow saved:', workflow);
    
    // Show success notification (you can add a proper notification system)
    alert('Workflow saved successfully!');
  };

  const handleExecute = async () => {
    if (nodes.length === 0) {
      alert('Please add nodes to the workflow before executing.');
      return;
    }
    
    setIsExecuting(true);
    console.log('Executing workflow with nodes:', nodes);
    
    // Simulate workflow execution
    // In a real implementation, this would make API calls to execute the workflow
    try {
      // Find trigger nodes
      const triggerNodes = nodes.filter(node => node.type === 'trigger');
      
      if (triggerNodes.length === 0) {
        alert('Please add a trigger node to start the workflow.');
        return;
      }
      
      // Simulate execution delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Workflow execution completed');
      alert('Workflow executed successfully!');
    } catch (error) {
      console.error('Workflow execution failed:', error);
      alert('Workflow execution failed!');
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <WorkflowHeader 
        workflowName={workflowName}
        onWorkflowNameChange={setWorkflowName}
        onSave={handleSave}
        onExecute={handleExecute}
      />
      <div className="flex-1 relative">
        <WorkflowCanvas />
      </div>
    </div>
  );
};

export default WorkflowEditor;
