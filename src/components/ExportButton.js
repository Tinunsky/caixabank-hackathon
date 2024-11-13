import React, { useCallback } from "react";
import { Button } from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";
import PropTypes from "prop-types";

const ExportButton = React.memo(function ExportButton({
  data,
  filename,
  headers,
  label,
}) {
  const handleExport = useCallback(() => {
    const csv = convertArrayOfObjectsToCSV(data, headers);
    if (!csv) return;

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [data, filename, headers]);

  const convertArrayOfObjectsToCSV = (data, headers) => {
    const csvRows = [];

    csvRows.push(headers.join(","));

    data.forEach((item) => {
      const values = headers.map((header) => {
        const escapedValue = String(item[header] || "").replace(/"/g, '""');
        return `"${escapedValue}"`;
      });
      csvRows.push(values.join(","));
    });

    return csvRows.join("\n");
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<DownloadIcon />}
      onClick={handleExport}
      disabled={!data || data.length === 0}
      fullWidth
    >
      {label || "Export CSV"}
    </Button>
  );
});

ExportButton.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  filename: PropTypes.string,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string,
};

ExportButton.defaultProps = {
  filename: "data.csv",
  label: "Export CSV",
};

export default ExportButton;
