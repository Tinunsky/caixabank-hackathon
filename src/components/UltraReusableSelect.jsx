import { Select, InputLabel, FormControl } from "@mui/material";

export const UtraReusableSelect = ({ label, value, setFunction, children }) => {
  return (
    <FormControl fullWidth margin="normal" required>
      <InputLabel id="type-label">{label}</InputLabel>
      <Select
        labelId="type-label"
        value={value}
        onChange={setFunction}
        label="Type"
        name="type"
      >
        {children}
      </Select>
    </FormControl>
  );
};
