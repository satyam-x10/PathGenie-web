'use client'
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ReactFlow = dynamic(() => import('reactflow'), { ssr: false });
import { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

import mockTaskData from '../../public/mongo.json';

const generateFlowchartData = (taskId) => {
  const nodes = [];
  const edges = [];
  const HORIZONTAL_SPACING = 300;
  const VERTICAL_SPACING = 100;
  const NODE_WIDTH = 200;
  const NODE_HEIGHT = 100;

  const calculateTreeDimensions = (currentTaskId) => {
    const task = mockTaskData.find(task => task.taskId === currentTaskId);
    if (!task) return { width: 0, height: 0, count: 0 };

    if (task.subTask.length === 0) {
      return { width: NODE_WIDTH, height: NODE_HEIGHT, count: 1 };
    }

    const childDimensions = task.subTask.map(calculateTreeDimensions);
    const totalWidth = Math.max(NODE_WIDTH, childDimensions.reduce((sum, dim) => sum + dim.width, 0) + (HORIZONTAL_SPACING * (childDimensions.length - 1)));
    const maxChildHeight = Math.max(...childDimensions.map(dim => dim.height));
    const totalHeight = NODE_HEIGHT + VERTICAL_SPACING + maxChildHeight;
    const totalCount = childDimensions.reduce((sum, dim) => sum + dim.count, 0) + 1;

    return { width: totalWidth, height: totalHeight, count: totalCount };
  };

  const positionNodes = (currentTaskId, x, y, availableWidth) => {
    const task = mockTaskData.find(task => task.taskId === currentTaskId);
    if (!task) return;

    const { width, count } = calculateTreeDimensions(currentTaskId);
    const nodeX = x + (availableWidth - width) / 2 + width / 2 - NODE_WIDTH / 2;

    nodes.push({
      id: task.taskId,
      type: 'default',
      data: { label: task.taskTitle },
      position: { x: nodeX, y },
      style: {
        background: 'linear-gradient(135deg, #05070b, #101726)',
        border: '1px solid #444',
        borderRadius: '8px',
        padding: '5px',
        width: NODE_WIDTH,
        height: NODE_HEIGHT,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '24px',
      },
    });

    if (task.subTask.length > 0) {
      let childX = x;
      task.subTask.forEach((subTaskId) => {
        const childDim = calculateTreeDimensions(subTaskId);
        positionNodes(subTaskId, childX, y + NODE_HEIGHT + VERTICAL_SPACING, childDim.width);
        childX += childDim.width + HORIZONTAL_SPACING;

        edges.push({
          id: `${task.taskId}-${subTaskId}`,
          source: task.taskId,
          target: subTaskId,
          type: 'smoothstep',
          style: { stroke: '#777', strokeWidth: 2 },
          markerEnd: { type: 'arrowclosed', width: 20, height: 20, color: '#777' },
        });
      });
    }
  };

  const rootDimensions = calculateTreeDimensions(taskId);
  positionNodes(taskId, 0, 0, rootDimensions.width);

  return { nodes, edges };
};

const Home = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
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
        fitViewOptions={{ padding: 0.2, minZoom: 0.1, maxZoom: 1.5 }}
        defaultEdgeOptions={{ type: 'smoothstep', animated: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        snapToGrid={true}
        snapGrid={[15, 15]}
      >
        <MiniMap nodeStrokeColor="#000" nodeBorderRadius={8} />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default Home;