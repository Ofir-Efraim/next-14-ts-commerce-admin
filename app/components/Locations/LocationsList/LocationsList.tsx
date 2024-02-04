import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { location } from "@/app/types";
import styles from "./LocationsList.module.css"; // Adjust the import path based on your project structure

type LocationsListProps = {
  locations: location[];
  onRemoveLocation: (locationId: string) => void;
};

const LocationsList: React.FC<LocationsListProps> = ({
  locations,
  onRemoveLocation,
}) => {
  return (
    <List>
      {locations.map((location) => (
        <div key={location.id} className={styles.listItemContainer}>
          <ListItem>
            <ListItemText
              primary={location.name}
              primaryTypographyProps={{ style: { textAlign: "right" } }}
            />
            <IconButton
              className={styles.deleteButton}
              onClick={() => onRemoveLocation(location.id)}
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

export default LocationsList;
