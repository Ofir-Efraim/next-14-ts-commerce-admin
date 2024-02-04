import React, { Dispatch, SetStateAction, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "./Locations.module.css"; // Adjust the import path based on your project structure
import { location } from "@/app/types";
import LocationsList from "./LocationsList/LocationsList";
import AddLocationForm from "./AddLocationForm/AddLocationForm";
type locationProps = {
  locations: location[];
  setLocations: Dispatch<SetStateAction<location[]>>;
};
const Locations = ({ locations, setLocations }: locationProps) => {
  const [isAddLocationFormOpen, setIsAddLocationFormOpen] = useState(false);

  const handleAddLocation = (newLocationName: string) => {
    console.log(newLocationName);
    setIsAddLocationFormOpen(false);
  };

  const handleRemoveLocation = (locationId: string) => {
    console.log(locationId);
    // Implement the logic to remove the location
    // Update the locations state accordingly
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>רשימת מיקומים</h1>
      <LocationsList
        locations={locations}
        onRemoveLocation={handleRemoveLocation}
      />

      <div className={styles.addButtonContainer}>
        <button
          className={styles.addButton}
          onClick={() => setIsAddLocationFormOpen(true)}
        >
          <AddIcon />
        </button>
      </div>

      <Dialog
        open={isAddLocationFormOpen}
        onClose={() => setIsAddLocationFormOpen(false)}
        style={{ textAlign: "right", direction: "rtl" }}
      >
        <DialogTitle>הוסף מיקום חדש</DialogTitle>
        <DialogContent>
          <AddLocationForm
            onClose={() => setIsAddLocationFormOpen(false)}
            onAddLocation={handleAddLocation}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddLocationFormOpen(false)}>ביטול</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Locations;
