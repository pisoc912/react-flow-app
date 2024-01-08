import { TypeStyles } from "@/app/Utils/TypeStyles";
import { AddOutlined, PlusOneOutlined } from "@mui/icons-material";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { Handle, Position } from "reactflow";

type DataType = {
  label: string;
  type: "project" | "phase" | "procedure" | "task" | "action";
  children?: DataType[];
};

export type CustomNodeComponentProps = {
  data: DataType;
};

const CustomNodeComponent: FC<CustomNodeComponentProps> = ({ data }) => {
  console.log(data);
  const style = TypeStyles[data.type] || {};
  return (
    <Paper
      elevation={3}
      style={{
        padding: "8px",
        border: "2px solid #cbd5e1",
        borderRadius: "8px",
        maxWidth: "300px",
        ...style
      }}
    >
      <Box display="flex" alignItems="center">
        <Box mx={2}>
          <Typography variant="h6" style={{ fontWeight: "bold", ...style }}>
            {data.label}
            {data.type}
          </Typography>
        </Box>
      </Box>

      <Handle
        type="target"
        position={Position.Left}
        style={{
          width: "10px",
          height: "14px",
          borderRadius: "3px",
          backgroundColor: "#784be8",
        }}
      />
      {data.children ? (
        <Handle
          type="source"
          position={Position.Right}
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: "#784be8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AddOutlined style={{ color: "white", fontSize: "1rem" }} />
        </Handle>
      ) : (
        <Handle
          type="target"
          position={Position.Right}
          style={{
            width: "10px",
            height: "14px",
            borderRadius: "3px",
            backgroundColor: "#784be8",
          }}
        />
      )}
    </Paper>
  );
};

export default CustomNodeComponent;
