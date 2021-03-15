import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";

const WAIT_INTERVAL = 1500;

const EditorComponent = ({
  selectedNoteIndex,
  selectedNote,
  notes,
  noteUpdate,
}) => {
  const [state, setState] = useState({
    text: "",
    title: "",
    id: "",
  });
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    setState({
      text: selectedNote.body,
      title: selectedNote.title,
      id: selectedNote.id,
    });
  }, [selectedNote]);

  const updateBody = async (val) => {
    clearTimeout(timer);
    await setState({
      title: selectedNote.title,
      id: selectedNote.id,
      text: val,
    });
    setTimer(setTimeout(update, WAIT_INTERVAL));
  };

  const updateTitle = async (text) => {
    clearTimeout(timer);
    await setState({ ...state, title: text });
    setTimer(setTimeout(update, WAIT_INTERVAL));
  };

  const update = () => {
    noteUpdate(state.id, { title: state.title, text: state.text });
  };

  return (
    <div style={{ height: "100%", boxSizing: "border-box" }}>
      <BorderColorIcon
        style={{
          position: "absolute",
          left: "310px",
          top: "12px",
          color: "white",
          width: "10",
          height: "10",
        }}
      ></BorderColorIcon>
      <input
        type="text"
        style={{
          height: "50px",
          boxSizing: "border-box",
          border: "none",
          padding: "5px",
          fontSize: "24px",
          width: "calc(100% - 300px)",
          backgroundColor: "#29487d",
          color: "white",
          paddingLeft: "50px",
        }}
        placeholder="Note Title..."
        value={state.title ? state.title : ""}
        onChange={(e) => updateTitle(e.target.value)}
      />
      <ReactQuill value={state.text} onChange={updateBody}></ReactQuill>
    </div>
  );
};

export default EditorComponent;
