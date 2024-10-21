"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import ReactDOM from 'react-dom';
import {
  Controls,
  Background,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";
import { createNodes, nodeTypes } from "@/utils/ReactFlow";
import ImproviseChat from "@/components/ImproviseChat";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, Loader, Menu, X } from 'lucide-react';

const ReactFlow = dynamic(
  () => import("reactflow").then((mod) => mod.ReactFlow),
  { ssr: false },
);

const Page = ({ params }) => {
  const minimapId = params.minimapId;
  const reactFlowWrapper = useRef(null);
  const [tree, setTree] = useState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [showList, setShowList] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [showImproviseChat, setShowImproviseChat] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [topicName, setTopicName] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const response = await axios.get(`/api/tree?minimapId=${minimapId}`);
        const treeData = response.data.data;
        setTree(treeData[0]?.data);

        const firstObject = treeData[0]?.data[0];
        const firstObjectName = firstObject ? Object.keys(firstObject)[0] : null;
        console.log("First Object Name:", firstObjectName);

        setTopicName(firstObjectName || "Flowchart");
      } catch (error) {
        console.error("Error fetching tree data:", error);
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

  const onInit = useCallback((instance) => {
    setReactFlowInstance(instance);
  }, []);

  const focusNode = useCallback(
    (nodeId) => {
      const node = nodes.find((n) => n.id === nodeId);
      if (node && reactFlowInstance) {
        const x = node.position.x;
        const y = node.position.y;
        const zoom = 1;
        reactFlowInstance.setCenter(x, y, { zoom, duration: 800 });
      }
    },
    [nodes, reactFlowInstance],
  );

  const handleNodeClick = (nodeId) => {
    setSelectedNodeId(nodeId);
    focusNode(nodeId);
    setShowImproviseChat(true);
    if (isMobile) {
      setShowList(false);
    }
  };

  const handleDownload = async () => {
    if (!reactFlowInstance || !reactFlowWrapper.current || isDownloading) return;

    setIsDownloading(true);

    try {
      // Store current viewport state
      const currentViewport = reactFlowInstance.getViewport();
      const currentNodes = reactFlowInstance.getNodes();

      // Calculate bounds
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;

      currentNodes.forEach(node => {
        const nodeWidth = node.width || 200;  // Default width if not specified
        const nodeHeight = node.height || 100; // Default height if not specified
        minX = Math.min(minX, node.position.x);
        minY = Math.min(minY, node.position.y);
        maxX = Math.max(maxX, node.position.x + nodeWidth);
        maxY = Math.max(maxY, node.position.y + nodeHeight);
      });

      // Add padding
      const padding = 100;
      minX -= padding;
      minY -= padding;
      maxX += padding;
      maxY += padding;

      // Calculate dimensions
      const width = maxX - minX;
      const height = maxY - minY;

      // Create temporary container
      const tempContainer = document.createElement('div');
      tempContainer.style.width = `${width}px`;
      tempContainer.style.height = `${height}px`;
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '-9999px';
      document.body.appendChild(tempContainer);

      // Prepare for capture
      const captureFlow = document.createElement('div');
      captureFlow.style.width = '100%';
      captureFlow.style.height = '100%';
      tempContainer.appendChild(captureFlow);

      // Apply dark theme styles
      const darkStyles = document.createElement('style');
      darkStyles.textContent = `
        .react-flow {
          background-color: #1a1a1a !important;
        }
        .react-flow__node {
          background-color: #2d2d2d !important;
          color: #ffffff !important;
          border-radius: 8px !important;
          border: 1px solid #4a5568 !important;
          padding: 12px !important;
          font-size: 14px !important;
        }
        .react-flow__edge path {
          stroke: #4a5568 !important;
          stroke-width: 2 !important;
        }
        .react-flow__edge-path {
          stroke: #4a5568 !important;
        }
        .react-flow__background {
          background-color: #1a1a1a !important;
        }
        .react-flow__handle {
          background-color: #4a5568 !important;
          border-color: #2d2d2d !important;
        }
      `;
      tempContainer.appendChild(darkStyles);

      // Create new ReactFlow instance
      const newFlow = reactFlowInstance.toObject();
      newFlow.nodes = newFlow.nodes.map(node => ({
        ...node,
        position: {
          x: node.position.x - minX,
          y: node.position.y - minY
        }
      }));

      // Render new instance
      await new Promise(resolve => {
        const temp = (
          <ReactFlowProvider>
            <div style={{ width: '100%', height: '100%' }}>
              <ReactFlow
                nodes={newFlow.nodes}
                edges={newFlow.edges}
                nodeTypes={nodeTypes}
                fitView
                minZoom={1}
                maxZoom={1}
                nodesDraggable={false}
                preventScrolling={true}
                zoomOnScroll={false}
                panOnScroll={false}
                onInit={resolve}
              >
                <Background color="#4a5568" gap={20} size={1} />
              </ReactFlow>
            </div>
          </ReactFlowProvider>
        );
        ReactDOM.render(temp, captureFlow);
      });

      // Wait for rendering
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Capture as canvas
      const canvas = await html2canvas(tempContainer, {
        backgroundColor: '#1a1a1a',
        scale: 2,
        logging: false,
        allowTaint: true,
        useCORS: true,
        width: width,
        height: height
      });

      // Clean up
      document.body.removeChild(tempContainer);

      // Convert to PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: width > height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);

      // Download
      pdf.save(`${topicName.toLowerCase().replace(/\s+/g, '-')}-flowchart.pdf`);

      // Restore viewport
      reactFlowInstance.setViewport(currentViewport);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <ReactFlowProvider>
      <div className="flex h-screen w-full bg-gray-900">
        {/* Topics List */}
        <div
          className={`${showList ? 'translate-x-0' : '-translate-x-full'
            } transition-transform duration-300 fixed md:static left-0 top-14 bottom-0 
          w-full md:w-80 bg-gray-800 text-white z-40 md:translate-x-0 
          ${!showList && 'md:hidden'}`}
        >
          <div className="h-full overflow-auto p-4">
            <ul className="space-y-2">
              {nodes.map((node) => (
                <li
                  key={node.id}
                  onClick={() => handleNodeClick(node.id)}
                  className={`cursor-pointer p-3 rounded-lg transition-colors duration-200 
                    ${selectedNodeId === node.id
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-700'}`}
                >
                  {node.data.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow flex flex-col">
          {/* Top Bar */}
          <div className="flex items-center gap-2 p-4 bg-gray-800 shadow-md">
            <button
              onClick={() => {
                setShowList(!showList);
                setShowImproviseChat(false);
              }}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 
                hover:from-blue-600 hover:to-blue-700 
                text-white rounded-lg transition-all duration-200 
                shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
                flex items-center gap-2"
            >
              {showList ? <X size={20} /> : <Menu size={20} />}
              <span className="hidden sm:inline">
                {showList ? 'Hide Topics' : 'Show Topics'}
              </span>
            </button>

            <button
              onClick={handleDownload}
              disabled={isDownloading || nodes.length === 0}
              className={`px-4 py-2 bg-gradient-to-r 
                ${isDownloading
                  ? 'from-gray-400 to-gray-500 cursor-not-allowed'
                  : 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'}
                text-white rounded-lg transition-all duration-200 
                shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
                flex items-center gap-2`}
            >
              {isDownloading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Download PDF</span>
                </>
              )}
            </button>
          </div>

          {/* Flow Chart */}
          {nodes.length > 0 ? (
            <div
              ref={reactFlowWrapper}
              className="flex-grow relative"
            >
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                minZoom={0.5}
                maxZoom={2}
                nodesDraggable={false}
                onInit={onInit}
                className="bg-gray-900"
              >
                <Controls className="bg-gray-800 text-white border-gray-700" />
                <Background color="#4a5568" gap={20} size={1} />
              </ReactFlow>
            </div>
          ) : (
            <div className="flex-grow flex items-center justify-center bg-gray-900">
              <Loader className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          )}
        </div>

        {/* Improvise Chat */}
        {showImproviseChat && selectedNodeId && (
          <div className={`fixed md:static right-0 top-14 bottom-0 
            w-full md:w-96 bg-gray-800 shadow-lg z-30 
            ${showImproviseChat ? 'translate-x-0' : 'translate-x-full'} 
            transition-transform duration-300 md:translate-x-0`}>
            <div className="h-full overflow-auto">
              <ImproviseChat
                node={nodes.find((node) => node.id === selectedNodeId)}
              />
            </div>
          </div>
        )}
      </div>
    </ReactFlowProvider>
  );
};

export default Page;