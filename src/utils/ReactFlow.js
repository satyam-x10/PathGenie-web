"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import {
  Controls,
  Background,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";
import { hash } from "crypto";

export const CustomNode = ({ data }) => {
  return (
    <div className="p-3 border border-gray-700 rounded-md bg-black min-w-[150px] text-center">
      <Handle type="target" position={Position.Top} id="top" />
      <strong>{data.label}</strong>
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </div>
  );
};

export const nodeTypes = {
  custom: CustomNode,
};

export const createNodes = (tree) => {
  const nodes = [];
  const edges = [];
  let id = 0;

  const HORIZONTAL_SPACING = 250;
  const VERTICAL_SPACING = 100;
  const NODE_WIDTH = 150;
  const NODE_HEIGHT = 50;

  const calculateTreeDimensions = (node) => {
    if (typeof node !== "object" || node === null) {
      return { width: NODE_WIDTH, height: NODE_HEIGHT, count: 1 };
    }

    const label = Object.keys(node)[0];
    const children = node[label];

    if (!Array.isArray(children) || children.length === 0) {
      return { width: NODE_WIDTH, height: NODE_HEIGHT, count: 1 };
    }

    const childDimensions = children.map(calculateTreeDimensions);
    const totalWidth = Math.max(
      NODE_WIDTH,
      childDimensions.reduce((sum, dim) => sum + dim.width, 0) +
        HORIZONTAL_SPACING * (childDimensions.length - 1),
    );
    const maxChildHeight = Math.max(
      ...childDimensions.map((dim) => dim.height),
    );
    const totalHeight = NODE_HEIGHT + VERTICAL_SPACING + maxChildHeight;
    const totalCount =
      childDimensions.reduce((sum, dim) => sum + dim.count, 0) + 1;

    return { width: totalWidth, height: totalHeight, count: totalCount };
  };

  const positionNodes = (node, x, y, availableWidth, parentId = null) => {
    if (typeof node !== "object" || node === null) return;
    // console.log('Node:', node);

    const label = Object.keys(node)[0];
    const children = node[label];
    const nodeId = `node_${id++}`;
    const { width } = calculateTreeDimensions(node);
    const nodeX = x + (availableWidth - width) / 2 + width / 2 - NODE_WIDTH / 2;

    nodes.push({
      id: nodeId,
      type: "custom",
      data: { label },
      position: { x: nodeX, y },
      draggable: false,
    });

    if (parentId !== null) {
      edges.push({
        id: `edge_${parentId}_${nodeId}`,
        source: parentId,
        target: nodeId,
        sourceHandle: "bottom",
        targetHandle: "top",
        type: "smoothstep",
      });
    }

    if (Array.isArray(children) && children.length > 0) {
      let childX = x;
      children.forEach((child) => {
        const childDim = calculateTreeDimensions(child);
        positionNodes(
          child,
          childX,
          y + NODE_HEIGHT + VERTICAL_SPACING,
          childDim.width,
          nodeId,
        );
        childX += childDim.width + HORIZONTAL_SPACING;
      });
    }
  };

  const rootDimensions = tree.map(calculateTreeDimensions);
  const totalWidth =
    rootDimensions.reduce((sum, dim) => sum + dim.width, 0) +
    HORIZONTAL_SPACING * (tree.length - 1);
  let currentX = 0;

  tree.forEach((node) => {
    const nodeDim = calculateTreeDimensions(node);
    positionNodes(node, currentX, 0, nodeDim.width);
    currentX += nodeDim.width + HORIZONTAL_SPACING;
  });

  return { nodes, edges };
};
