// src/app/flow/page.tsx
'use client';

import {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  Position,
  ReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css'; // <-- make sure this import is here
import { useCallback, useState } from 'react';

export default function FlowPage() {
  /* ---------- minimal starter state ---------- */
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: 'agent-1',
      type: 'default', // <-- REQUIRED
      position: { x: 0, y: 0 },
      data: { label: 'FunctionAgent' },
      sourcePosition: Position.Right, // optional handle helpers
      targetPosition: Position.Left,
    },
  ]);

  const [edges, setEdges] = useState<Edge[]>([]);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <ReactFlowProvider>
      <div className="h-screen w-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          fitView // auto-centers first render
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}
