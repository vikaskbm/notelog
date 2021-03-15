import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import styles from "./styles";
import SidebarItemComponent from "../sidebaritem/sidebarItem";

const SideBarComponent = () => {
  return <h1>Hello from sidebar component</h1>;
};

export default withStyles(styles)(SideBarComponent);
