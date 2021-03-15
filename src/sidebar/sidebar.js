import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import SidebarItemComponent from "../sidebaritem/sidebarItem";

const SideBarComponent = ({
  notes,
  selectedNoteIndex,
  selectNote,
  newNote,
  deleteNote,
}) => {
  const [state, setState] = useState({ addingNote: false, title: null });

  const newNoteBtnClick = () => {
    setState({ ...state, addingNote: !state.addingNote });
  };

  const updateTitle = (text) => {
    setState({ ...state, title: text });
  };

  const addnewNote = () => {
    newNote(state.title);
    setState({ title: null, addingNote: false });
  };

  const selectTheNote = (n, i) => {
    selectNote(n, i);
  };

  const deleteTheNote = (note) => {
    deleteNote(note);
  };

  if (notes) {
    return (
      <div
        style={{
          marginTop: "0px",
          width: "300px",
          height: "100vh",
          boxSizing: "border-box",
          float: "left",
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
        <Button
          onClick={newNoteBtnClick}
          style={{
            width: "100%",
            height: "35px",
            borderBottom: "1px solid black",
            borderRadius: "0px",
            backgroundColor: "#29487d",
            color: "white",
            "&:hover": {
              backgroundColor: "#88a2ce",
            },
          }}
        >
          {state.addingNote ? "Cancel" : "Add Note"}
        </Button>

        {state.addingNote ? (
          <div>
            <input
              type="text"
              style={{
                width: "100%",
                margin: "0px",
                height: "35px",
                outline: "none",
                border: "none",
                paddingLeft: "5px",
                "&:focus": {
                  outline: "2px solid rgba(81, 203, 238, 1)",
                },
              }}
              placeholder="Enter Note title"
              onKeyUp={(e) => updateTitle(e.target.value)}
            />
            <Button
              style={{
                width: "100%",
                backgroundColor: "#28787c",
                borderRadius: "0px",
                color: "white",
              }}
              onClick={addnewNote}
            >
              Submit Note
            </Button>
          </div>
        ) : null}
        <List>
          {notes.map((note, index) => {
            return (
              <div key={index}>
                <SidebarItemComponent
                  note={note}
                  index={index}
                  selectedNoteIndex={selectedNoteIndex}
                  selectNote={selectNote}
                  deleteNote={deleteTheNote}
                ></SidebarItemComponent>
                <Divider></Divider>
              </div>
            );
          })}
        </List>
      </div>
    );
  } else {
    return <div> </div>;
  }
};

export default withStyles(styles)(SideBarComponent);
