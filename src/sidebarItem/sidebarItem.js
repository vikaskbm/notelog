import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from './styles';
import { removeHTMLTags } from "../helpers";

const SidebarItemComponent = ({note, index, selectedNoteIndex, selectNote, deleteNote}) => {

  return (
  <div key={index}>
    <ListItem
      style={{
        cursor: 'pointer'
      }}
      selected={selectedNoteIndex===index}
      alignItems='flex-start'
    >
      <div 
        style={{
          maxWidth: '85%'
        }}
        onClick={() => selectNote(note, index)}
      >
        <ListItemText
          primary={note.title}
          secondary={note.body.substring(0, 30) + "..."}
        >
        </ListItemText>
      </div>

      <DeleteIcon 
        onClick={() => deleteNote(note)}
        style={{
          position: 'absolute',
          right: '5px',
          top: 'calc(50% - 15px)',
          hover: 'red'
        }}
      ></DeleteIcon>
    
    </ListItem>    
  </div>
  );
};

export default withStyles(styles)(SidebarItemComponent);
