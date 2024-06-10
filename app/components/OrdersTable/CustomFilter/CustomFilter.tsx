import { Button, Checkbox, Menu, MenuItem } from "@mui/material";
import React from "react";
type customFilterProps = {
  buttonLabel: string;
  tracker: string[];
  setTracker: React.Dispatch<React.SetStateAction<string[]>>;
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  handleCheckboxChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    queryKey: string
  ) => void;
  queryKey: string;
  queryOptions: { label: string; value: string }[];
};

const CustomFilter = ({
  buttonLabel,
  tracker,
  setTracker,
  anchorEl,
  setAnchorEl,
  handleCheckboxChange,
  queryKey,
  queryOptions,
}: customFilterProps) => {
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleToggleCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>,
    queryKey: string
  ) => {
    const value = event.target.value;
    if (tracker.includes(value)) {
      setTracker(tracker.filter((s) => s !== value));
    } else {
      setTracker([...tracker, value]);
    }
    handleCheckboxChange(event, queryKey);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        aria-controls="status-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {buttonLabel}
      </Button>
      <Menu
        id="status-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {queryOptions.map((option) => (
          <MenuItem>
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              <Checkbox
                value={option.value}
                checked={tracker.includes(option.value)}
                onChange={(e) => handleToggleCheckbox(e, queryKey)}
                color="primary"
              />
              {option.label}
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default CustomFilter;
