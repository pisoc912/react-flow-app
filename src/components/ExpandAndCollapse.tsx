import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
  MarkerType,
  Edge,
  EdgeProps,
  Node,
  XYPosition,
} from "reactflow";
import "reactflow/dist/style.css";

import "./index.css";
import CustomNodeComponent from "./CustomNodeComponent";
import { demoData } from "@/app/Utils/demo";

interface CustomNode {
  id?: string;
  title: string;
  objective: string;
  description: string;
  type: string;
  data: CustomNode[];
  level?: string;
  tag?: string;
  parent?: string;
  children?: CustomNode[];
  position: XYPosition;
}

const initialNodes: CustomNode[] = [
  {
    id: "1",
    name: "Product Feedback Analysis",
    objective:
      "The goal is to enhance product quality, user experience, and customer satisfaction. By understanding feedback trends, businesses can make informed decisions to refine and optimize their offerings.",
    description:
      "It involves systematically examining customer reviews, ratings, and comments regarding a product or service. It focuses on identifying patterns, preferences, and areas for improvement.",
    type: "project",

    children: [
      {
        id: "2",
        name: "b",
        parent: "1",
        children: [
          {
            id: "3",
            title: "Project Initiation",
            objective:
              "To formally define and authorize the project, ensure alignment with organizational goals, and obtain stakeholder buy-in.",
            description:
              "This phase involves defining the project at a high level, establishing its purpose, scope, and goals, and securing initial resources and stakeholder support.",
            type: "phase",
            children: [
              {
                id: "4",
                parent: "3",
                name: "d",
              },
            ],
          },
        ],
      },
      {
        id: "5",
        name: "b",
        parent: "1",
        children: [
          {
            id: "6",
            name: "c",
            parent: "5",
            children: [
              {
                id: "7",
                parent: "6",
                name: "d",
              },
            ],
          },
        ],
      },
      {
        id: "8",
        name: "b",
        parent: "1",
        children: [
          {
            id: "9",
            name: "c",
            parent: "8",
            children: [
              {
                id: "10",
                parent: "9",
                name: "d",
              },
            ],
          },
        ],
      },
      {
        id: "11",
        name: "f",
        parent: "1",
      },
    ],
  },
];

const initialEdges: Edge[] = [
  {
    id: "edges-e5-7",
    source: "0",
    target: "1",
    label: "+",
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: "#FFCC00", color: "#fff", fillOpacity: 0.7 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];

let id = 1;
const getId = () => `${id++}`;

const nodeTypes = {
  custom: CustomNodeComponent,
};

const fitViewOptions = {
  padding: 1,
};

const ExpandAndCollapse: FC = (props) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);
  const onConnect = useCallback(
    (params: Edge | EdgeProps) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  useEffect(() => {
    const newNodes = demoData.map((item) => ({
      id: item.id,
      type: "custom",
      data: {
        label: item.title,
        objective: item.objective,
        description: item.description,
        children: item.children,
      },
      position: { x: 0, y: 0 },
      sourcePosition: "right",
      targetPosition: "left",
    })) as Node[];
    console.log(newNodes);
    setNodes(newNodes);
  }, []);

  const handleNodeClick = (e: MouseEvent, node: CustomNode) => {
    const existingChildren = nodes.filter((n) => n.data.parent === node.id);

    if (existingChildren.length === 0) {
      const newNodes = node.data.children.map((child, index) => ({
        id: child.id,
        type: "custom",
        data: {
          label: child.title,
          objective: child.objective,
          description: child.description,
          children: child.children,
          parent: child.parent,
        },
        position: {
          x: node.position.x + 400,
          y:
            node.position.y +
            index * 100 -
            (node.data.children.length * 50) / 2, // 纵向偏移
        },
        sourcePosition: "right",
        targetPosition: "left",
      }));

      const newEdges = newNodes.map((childNode) => ({
        id: `e${node.id}-${childNode.id}`,
        source: node.id,
        target: childNode.id,
        markerEnd: { type: MarkerType.ArrowClosed },
      }));

      setNodes((nds) => nds.concat(newNodes));
      setEdges((eds) => eds.concat(newEdges));
    } else {
      // 如果子节点已存在，则从视图中移除它们
      setNodes((nds) => nds.filter((n) => n.data.parent !== node.id));
      setEdges((eds) => eds.filter((e) => e.source !== node.id));
    }
  };

  return (
    <div className="wrapper">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        fitView
        defaultViewport={{ x: 1, y: 1, zoom: 0.5 }}
        fitViewOptions={fitViewOptions}
      />
    </div>
  );
};

export default ExpandAndCollapse;
