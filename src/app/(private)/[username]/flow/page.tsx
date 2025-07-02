'use client';

import AgentNode from '@/components/prebuilt/reactFlow/AgentNode';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Connection,
  Controls,
  Edge,
  Node,
  ReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useState } from 'react';

export default function FlowPage() {
  const [nodes, setNodes] = useState<Node[]>([
    { id: 'A', type: 'agent', position: { x: 200, y: 120 }, data: {} },
  ]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange = useCallback(
    (changes: import('@xyflow/react').NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: import('@xyflow/react').EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params: Connection | Edge) =>
      setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    []
  );

  /* always re-created each render → fresh state */
  const exportJson = () => {
    const data = { nodes, edges };
    console.log('Flow JSON:', JSON.stringify(data, null, 2));
  };

  return (
    <ReactFlowProvider>
      {/* Export button */}
      <button
        onClick={exportJson}
        className="absolute right-4 top-4 z-50 rounded bg-blue-600 px-3 py-1 text-sm text-white shadow"
      >
        Export JSON
      </button>

      <div className="h-screen w-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={{ agent: AgentNode }}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}
