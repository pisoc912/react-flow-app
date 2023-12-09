"use client";

import ExpandAndCollapse from "@/components/ExpandAndCollapse";
import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";

export default function App() {
  return (
    <ReactFlowProvider>
      <ExpandAndCollapse />
    </ReactFlowProvider>
  );
}
