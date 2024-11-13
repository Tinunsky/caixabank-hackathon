import React from "react";
import { Button } from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";
import { profilerData } from "../utils/profilerData";

function DownloadProfilerData() {
  const handleDownload = () => {
    if (profilerData.length === 0) {
      alert("Nothing to download.");
      return;
    }

    const jsonData = JSON.stringify(profilerData, null, 2);

    const blob = new Blob([jsonData], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "profiler_data.json");

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      startIcon={<DownloadIcon />}
      onClick={handleDownload}
      fullWidth
    >
      Download Profiler Data
    </Button>
  );
}

export default DownloadProfilerData;
