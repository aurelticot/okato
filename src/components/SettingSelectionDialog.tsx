import React from "react";
import { Dialog, DialogTitle, List, ListItem, ListItemText } from "@material-ui/core";
import SettingValue from "interfaces/SettingValue";

export interface SettingSelectionDialogProps {
  title: string;
  open: boolean;
  values: SettingValue[];
  selectedValue: string | string[];
  onClose: (value: string | string[]) => void;
}

export function SettingSelectionDialog(props: SettingSelectionDialogProps) {
  const { open, selectedValue, onClose, title, values } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="">
      <DialogTitle id="dialog-title">{title}</DialogTitle>
      <List>
        {values.map((value) => (
          <ListItem button onClick={() => handleListItemClick(value.key)} key={value.key}>
            <ListItemText primary={value.localizedLabelKey} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
