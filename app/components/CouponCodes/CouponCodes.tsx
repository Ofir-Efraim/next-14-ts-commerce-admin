import React, { Dispatch, SetStateAction, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "./CouponCodes.module.css"; // Adjust the import path based on your project structure
import { couponCode } from "@/app/types";
import CouponCodesList from "./CouponCodesList/CouponCodesList";
import AddCouponCodeForm from "./AddCouponCodeForm/AddCouponCodeForm";
import { addCouponCode, deleteCouponCode, toggleCouponCodeActive } from "@/app/api";
type couponCodesProps = {
  couponCodes: couponCode[];
  fetchCouponCodes: () => Promise<void>;
};
const CouponCodes = ({ couponCodes, fetchCouponCodes }: couponCodesProps) => {
  const [isAddCouponCodeFormOpen, setIsAddCouponCodeFormOpen] = useState(false);

  const handleAddCouponCode = async (newCouponCodeName: string, newDiscountPercentage : number) => {
    await addCouponCode(newCouponCodeName, newDiscountPercentage);
    fetchCouponCodes();
    setIsAddCouponCodeFormOpen(false);
  };

  const handleRemoveCouponCode = async (couponCodeId: string) => {
    await deleteCouponCode(couponCodeId);
    fetchCouponCodes();
  };

  const handleToggleCouponCodeActive = async (couponCodeId: string) => {
    await toggleCouponCodeActive(couponCodeId);
    fetchCouponCodes();
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>רשימת קודי קופון</h1>
      <CouponCodesList
        couponCodes={couponCodes}
        onRemoveCouponCode={handleRemoveCouponCode}
        onToggleCouponCodeActive={handleToggleCouponCodeActive}
      />

      <div className={styles.addButtonContainer}>
        <button
          className={styles.addButton}
          onClick={() => setIsAddCouponCodeFormOpen(true)}
        >
          <AddIcon />
        </button>
      </div>

      <Dialog
        open={isAddCouponCodeFormOpen}
        onClose={() => setIsAddCouponCodeFormOpen(false)}
        style={{ textAlign: "right", direction: "rtl" }}
      >
        <DialogTitle>הוסף קוד קופון חדש</DialogTitle>
        <DialogContent>
          <AddCouponCodeForm
            onClose={() => setIsAddCouponCodeFormOpen(false)}
            onAddCouponCode={handleAddCouponCode}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddCouponCodeFormOpen(false)}>ביטול</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CouponCodes;
