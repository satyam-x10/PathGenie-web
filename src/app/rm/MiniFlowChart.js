"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ReactFlow = dynamic(() => import("reactflow"), { ssr: false });
import { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";

const MiniFlowChart = (taskId) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  const { nodes, edges } = generateFlowchartData(taskId);

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
