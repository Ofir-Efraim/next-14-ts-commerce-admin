import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import styles from "./AddCouponCodeForm.module.css";
type AddLocationFormProps = {
  onClose: () => void;
  onAddCouponCode: (newCouponCodeName: string) => void;
};

const AddLocationForm: React.FC<AddLocationFormProps> = ({
  onClose,
  onAddCouponCode,
}) => {
  const [newCouponCodeName, setNewCouponCodeName] = useState("");

  const handleAddCouponCode= () => {
    if (newCouponCodeName.trim() !== "") {
      // Call the callback to add a new location
      onAddCouponCode(newCouponCodeName.trim());
      // Clear the input and close the form
      setNewCouponCodeName("");
      onClose();
    }
  };

  return (
    <div className={styles.formContainer}>
      <TextField
        className={styles.inputField}
       
        value={newCouponCodeName}
        onChange={(e) => setNewCouponCodeName(e.target.value)}
        fullWidth
      />
      <Button className={styles.addButton} onClick={handleAddCouponCode}>
        הוסף קוד קופון
      </Button>
    </div>
  );
};

export default AddLocationForm;
