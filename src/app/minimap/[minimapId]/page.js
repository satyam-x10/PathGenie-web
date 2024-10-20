'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Controls, Background, ReactFlowProvider, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import axios from 'axios';
import { createNodes, nodeTypes } from '@/utils/ReactFlow';
import ImproviseChat from '@/components/ImproviseChat';

const ReactFlow = dynamic(() => import('reactflow').then((mod) => mod.ReactFlow), { ssr: false });

const Page = ({ params }) => {
  const minimapId = params.minimapId;
  console.log('Minimap ID:', minimapId);

  const [tree, setTree] = useState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [showList, setShowList] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [showImproviseChat, setShowImproviseChat] = useState(false);
  
  useEffect(() => {
    const fetchTree = async () => {
      try {
        const response = await axios.get(`/api/tree?minimapId=${minimapId}`);
        const treeData = response.data.data;
        console.log('Tree data:', treeData);

        setTree(treeData[0]?.data);
        console.log('Tree:', treeData[0]?.data);
      } catch (error) {
        console.error('Error fetching tree data:', error);
      }
    };

    fetchTree();
  }, [minimapId]);

  useEffect(() => {
    if (tree.length > 0) {
      const { nodes: newNodes, edges: newEdges } = createNodes(tree);
      setNodes(newNodes);
      setEdges(newEdges);
    }
  }, [tree, setNodes, setEdges]);

  const onLayout = useCallback(() => {
    if (tree.length > 0) {
      const { nodes: newNodes, edges: newEdges } = createNodes(tree);
      setNodes(newNodes);
      setEdges(newEdges);
    }
  }, [tree, setNodes, setEdges]);

  const onInit = (reactFlowInstance) => {
    setReactFlowInstance(reactFlowInstance);
  };

  const focusNode = useCallback((nodeId) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (node && reactFlowInstance) {
      const x = node.position.x;
      const y = node.position.y;
      const zoom = 1;

      reactFlowInstance.setCenter(x, y, { zoom, duration: 800 });
    }
  }, [nodes, reactFlowInstance]);

  const handleNodeClick = (nodeId) => {
    setSelectedNodeId(nodeId);
    focusNode(nodeId);
    setShowImproviseChat(true);
    setShowList(false);
  };

  return (
    <ReactFlowProvider>
      <div className="flex h-screen w-full">
        {showList && !showImproviseChat && (
          <div className="w-1/4 bg-gray-800 text-white p-4 overflow-auto">
            <h2 className="text-xl font-bold mb-4">Node List</h2>
            <ul>
              {nodes.map((node) => (
                <li
                  key={node.id}
                  onClick={() => handleNodeClick(node.id)}
                  className={`cursor-pointer p-2 rounded ${
                    selectedNodeId === node.id ? 'bg-blue-600' : 'hover:bg-gray-700'
                  }`}
                >
                  {node.data.label}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex-grow">
          <h1 className="text-2xl font-bold mb-4">Tree Structure</h1>
          <button
            onClick={onLayout}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reset Layout
          </button>
          <button
            onClick={() => {
              setShowList(!showList);
              setShowImproviseChat(false);
            }}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Show List
          </button>
          <button
            onClick={() => {
              setShowImproviseChat(!showImproviseChat);
              setShowList(false);
            }}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Show ImproviseChat
          </button>
          {nodes.length > 0 ? (
            <div ref={reactFlowWrapper} style={{ height: 'calc(100vh - 120px)', width: '100%' }}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                minZoom={0.1}
                maxZoom={1.5}
                nodesDraggable={false}
                onInit={onInit}
              >
                <Controls />
                <Background />
              </ReactFlow>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        {showImproviseChat && selectedNodeId && (
          <ImproviseChat node={nodes.find(node => node.id === selectedNodeId)} />
        )}
      </div>
    </ReactFlowProvider>
  );
};

export default Page;
