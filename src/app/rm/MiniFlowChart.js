"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ReactFlow = dynamic(() => import("reactflow"), { ssr: false });
import { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";

const generateFlowchartData = (tree) => {
  const nodes = [];
  const edges = [];

  // Create a mapping of nodes by their IDs for easier access
  const nodeMap = {};

  // Iterate over the tree to populate nodes and edges
  tree?.forEach((item) => {
    // Create a node
    const node = {
      id: item._id,
      data: { label: item.topic || item.name },
      position: { x: Math.random() * 200, y: Math.random() * 200 }, // Random position for demo purposes
    };
    nodes.push(node);
    nodeMap[item._id] = node; // Map for quick access

    // Create edges based on parent-child relationships
    if (item.parent) {
      edges.push({
        id: `${item.parent}-${item._id}`, // Unique edge ID
        source: item.parent,
        target: item._id,
      });
    }
  });

  return { nodes, edges };
};

const MiniFlowChart = ({ tree }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  const { nodes, edges } = generateFlowchartData(tree);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.2, minZoom: 0.1, maxZoom: 1.5 }}
        defaultEdgeOptions={{ type: "smoothstep", animated: true }}
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

export default MiniFlowChart;
