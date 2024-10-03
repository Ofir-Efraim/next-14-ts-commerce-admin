import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import styles from "./AddCouponCodeForm.module.css";
type AddLocationFormProps = {
  onClose: () => void;
  onAddCouponCode: (newCouponCodeName: string, newDiscountPercentage : number) => void;
};

const AddLocationForm: React.FC<AddLocationFormProps> = ({
  onClose,
  onAddCouponCode,
}) => {
  const [newCouponCodeName, setNewCouponCodeName] = useState("");
  const [newDiscountPercentage, setNewDiscountPercentage] = useState(0);

  const handleAddCouponCode= () => {
    if (newCouponCodeName.trim() !== "" && newDiscountPercentage) {
      // Call the callback to add a new location
      onAddCouponCode(newCouponCodeName.trim(), newDiscountPercentage);
      // Clear the input and close the form
      setNewCouponCodeName("");
      setNewDiscountPercentage(0);
      onClose();
    }
  };

  return (
    <div className={styles.formContainer}>
      <TextField
        className={styles.inputField}
        label={'קוד קופון'}
        value={newCouponCodeName}
        onChange={(e) => setNewCouponCodeName(e.target.value)}
        fullWidth
      />
       <TextField
        className={styles.inputField}
       label={'אחוז הנחה'}
        value={newDiscountPercentage}
        onChange={(e) => setNewDiscountPercentage(Number(e.target.value))}
        fullWidth
      />
      <Button className={styles.addButton} onClick={handleAddCouponCode}>
        הוסף קוד קופון
      </Button>
    </div>
  );
};

export default AddLocationForm;
