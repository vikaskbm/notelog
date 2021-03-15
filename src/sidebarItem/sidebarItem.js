import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./styles";
import { removeHTMLTags } from "../helpers";

const SidebarItemComponent = () => {
  return <h1>Hello from sidebar-item component</h1>;
};

export default withStyles(styles)(SidebarItemComponent);
