import { useCallback, useMemo } from "react";
import ReactFlow, {
  Controls,
  Background,
  addEdge,
  Connection,
  Edge,
  Node,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import TextUpdaterNode from "./TextUpdaterNode";

const initialNodes = [
  {
    id: "0",
    data: { label: "Node" },
    position: { x: 0, y: 0 },
    type: "textUpdater",
  },
];

const initialEdges: Edge[] = [];

const nodeTypes = { textUpdater: TextUpdaterNode };

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const handleAddNode = useCallback(
    (node: Node) => {
      setNodes((nds) => nds.concat(node));
    },
    [setNodes]
  );

  const nodeTypes = useMemo(
    () => ({
      textUpdater: (nodeProps) => (
        <TextUpdaterNode {...nodeProps} onAddNode={handleAddNode} />
      ),
    }),
    [handleAddNode]
  );

  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </ReactFlowProvider>
  );
}

export default Flow;
