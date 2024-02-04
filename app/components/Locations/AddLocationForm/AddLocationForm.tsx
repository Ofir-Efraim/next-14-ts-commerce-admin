import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import styles from "./AddLocationForm.module.css";
type AddLocationFormProps = {
  onClose: () => void;
  onAddLocation: (newLocationName: string) => void;
};

const AddLocationForm: React.FC<AddLocationFormProps> = ({
  onClose,
  onAddLocation,
}) => {
  const [newLocationName, setNewLocationName] = useState("");

  const handleAddLocation = () => {
    if (newLocationName.trim() !== "") {
      // Call the callback to add a new location
      onAddLocation(newLocationName.trim());
      // Clear the input and close the form
      setNewLocationName("");
      onClose();
    }
  };

  return (
    <div className={styles.formContainer}>
      <TextField
        className={styles.inputField}
       
        value={newLocationName}
        onChange={(e) => setNewLocationName(e.target.value)}
        fullWidth
      />
      <Button className={styles.addButton} onClick={handleAddLocation}>
        הוסף מיקום
      </Button>
    </div>
  );
};

export default AddLocationForm;
