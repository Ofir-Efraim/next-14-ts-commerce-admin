import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Switch,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { couponCode } from "@/app/types";
import styles from "./CouponCodesList.module.css"; // Adjust the import path based on your project structure

type couponCodesListListProps = {
  couponCodes: couponCode[];
  onRemoveCouponCode: (couponCodeId: string) => void;
  onToggleCouponCodeActive : (couponCodeId: string) => void;
};

const CouponCodesList: React.FC<couponCodesListListProps> = ({
  couponCodes,
  onRemoveCouponCode,
  onToggleCouponCodeActive
}) => {
  return (
    <List>
      {couponCodes.map((couponCode) => (
        <div key={couponCode.id} className={styles.listItemContainer}>
          <ListItem>
            <ListItemText
              primary={couponCode.coupon_code}
              primaryTypographyProps={{ style: { textAlign: "right" } }}
            />
             <Switch
                  checked={couponCode.active}
                  onChange={() => onToggleCouponCodeActive(couponCode.id)}
                  color="primary"
                />
            <IconButton
              className={styles.deleteButton}
              onClick={() => onRemoveCouponCode(couponCode.id)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  );
};

export default CouponCodesList;
