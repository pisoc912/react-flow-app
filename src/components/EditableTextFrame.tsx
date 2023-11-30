import { CheckOutlined, EditOutlined } from "@mui/icons-material";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, FC, useState } from "react";

interface EditableTextProps {
  initialText: string;
}
const EditableTextFrame: FC<EditableTextProps> = ({ initialText }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        padding: "10px",
        width: "150px",
        height: "30px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "white",
      }}
    >
      {isEditing ? (
        <>
          <TextField
            value={text}
            variant="standard"
            onChange={handleChange}
            size="small"
            sx={{ flexGrow: 1 }}
          />
          <IconButton onClick={handleSave}>
            <CheckOutlined />
          </IconButton>
        </>
      ) : (
        <>
          <Typography
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {text}
          </Typography>
          <IconButton onClick={handleEdit}>
            <EditOutlined />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export default EditableTextFrame;
