import { AddOutlined, PlusOneOutlined } from "@mui/icons-material";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { Handle, Position } from "reactflow";

const CustomNodeComponent = ({ data }) => {
  console.log(data);
  return (
    <Paper
      elevation={3}
      style={{
        padding: "8px",
        border: "2px solid #cbd5e1",
        borderRadius: "8px",
        maxWidth: "300px",
      }}
    >
      <Box display="flex" alignItems="center">
        <Box mx={2}>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            {data.label}
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
    </Paper>
  );
};

export default CustomNodeComponent;
