'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ReactFlow = dynamic(() => import('reactflow'), { ssr: false });
import { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

import mockTaskData from '../public/mongo.json';

const generateFlowchartData = (taskId, parentPosition = { x: 50, y: 0 }, level = 0) => {
  const nodes = [];
  const edges = [];
  const HORIZONTAL_SPACING = 300; // Increased for better edge separation
  const VERTICAL_SPACING = 200;   // Increased for better edge routing

  const task = mockTaskData.find(task => task.taskId === taskId);

  if (task) {
    const positionX = parentPosition.x + (level * HORIZONTAL_SPACING);
    const positionY = parentPosition.y;

    // Add current task node with handle positions
    nodes.push({
      id: task.taskId,
      type: 'default',
      data: { label: task.taskTitle },
      position: { x: positionX, y: positionY },
      style: {
        background: '#fff',
        border: '1px solid #777',
        borderRadius: '8px',
        padding: '10px',
        width: 180,
      },
      // Add source and target handles on the sides
      sourcePosition: 'right',
      targetPosition: 'left',
    });

    if (task.subTask.length > 0) {
      // Distribute subtasks vertically
      const totalHeight = (task.subTask.length - 1) * VERTICAL_SPACING;
      const startY = positionY - (totalHeight / 2);

      task.subTask.forEach((subTaskId, index) => {
        const subTask = mockTaskData.find(sub => sub.taskId === subTaskId);
        if (subTask) {
          const newPosition = {
            x: positionX,
            y: startY + (index * VERTICAL_SPACING),
          };

          // Add edge with improved routing
          edges.push({
            id: `${task.taskId}-${subTask.taskId}`,
            source: task.taskId,
            target: subTask.taskId,
            type: 'smoothstep',
            style: { 
              stroke: '#777',
              strokeWidth: 2,
            },
            // Remove explicit handles as they're defined in the nodes
            markerEnd: {
              type: 'arrowclosed',
              width: 20,
              height: 20,
              color: '#777',
            },
          });

          const { nodes: subNodes, edges: subEdges } = generateFlowchartData(
            subTaskId,
            newPosition,
            level + 1
          );
          nodes.push(...subNodes);
          edges.push(...subEdges);
        }
      });
    }
  }

  return { nodes, edges };
};

const Home = () => {
  const [mounted, setMounted] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(mockTaskData);
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  const { nodes, edges } = generateFlowchartData("1");

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ 
          padding: 0.2,
          minZoom: 0.5,
          maxZoom: 1.5,
        }}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
        }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        snapToGrid={true}
        snapGrid={[15, 15]}
      >
        <MiniMap 
          nodeStrokeColor="#777"
          nodeColor="#fff"
          nodeBorderRadius={8}
        />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default Home;