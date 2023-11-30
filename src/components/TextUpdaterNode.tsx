import React, { ChangeEvent, FC, useCallback, useState } from "react";
import { Handle, NodeProps, Position, useReactFlow } from "reactflow";
import EditableTextFrame from "./EditableTextFrame";
import { IconButton } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";

interface TextUpdaterNodeProps extends NodeProps {
  data: { label: string };
  isConnectable: boolean;
  onAddNode: (node: Node) => void;
}

let id = 1;
const getId = () => `${id++}`;

const TextUpdaterNode: FC<TextUpdaterNodeProps> = ({
  data,
  isConnectable,
  onAddNode,
}) => {
  const [nodeName, setNodeName] = useState<string>("");
  const [lastNodePosition, setLastNodePosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const { screenToFlowPosition } = useReactFlow();

  const handleAddNode = useCallback(() => {
    const xOffset = 100;
    const yOffset = 50;

    const newNodePosition = {
      x: lastNodePosition.x + xOffset,
      y: lastNodePosition.y + yOffset,
    };

    const id = getId();
    const newNode: Node = {
      id,
      position: screenToFlowPosition(newNodePosition),
      data: { label: nodeName || `Node ${id}` },
      type: "textUpdater",
    };

    setLastNodePosition(newNodePosition);
    onAddNode(newNode);
  }, [lastNodePosition, screenToFlowPosition, onAddNode, nodeName]);

  const onChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <EditableTextFrame initialText={data.label} />
        <IconButton onClick={handleAddNode}>
          <AddOutlined />
        </IconButton>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default TextUpdaterNode;
