'use client';
import { Handle, Position } from '@xyflow/react';

export default function AgentNode() {
  return (
    <div className="bg-main border-1 border-border shadow-shadow p-2">
      {/* 1. input (left) */}
      <Handle
        type="target"
        position={Position.Left}
        id="input"
        className="!bg-blue-500 w-2 h-2"
      />

      {/* 2. context (top) */}
      <Handle
        type="target"
        position={Position.Top}
        id="context"
        className="!bg-purple-500 w-2 h-2"
      />

      {/* 3. output (right) */}
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        className="!bg-green-500 w-2 h-2"
      />

      {/* 4. tool (bottom) */}
      <Handle
        type="target"
        position={Position.Bottom}
        id="tool"
        className="!bg-yellow-500 w-2 h-2"
      />

      {/* node body */}
      <strong>AgentNode</strong>
    </div>
  );
}
