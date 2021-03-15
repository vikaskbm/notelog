import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import debounce from "../helpers";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import styles from './styles';


const WAIT_INTERVAL = 1500;

const EditorComponent = ({selectedNoteIndex, selectedNote, notes, noteUpdate}) => {
  const [state, setState] = useState({
    text: "",
    title: "",
    id: "",
  });
  const [timer, setTimer] = useState(null);   


  useEffect(() => {
    setState({text:selectedNote.body, title:selectedNote.title, id: selectedNote.id})
  }, [selectedNote])


  const updateBody = async(val) =>{
    clearTimeout(timer);
    await setState({ title:selectedNote.title, id: selectedNote.id, text: val });
    setTimer(setTimeout(update, WAIT_INTERVAL));
  }

  const update = () => { 
    noteUpdate(state.id, {title: state.title, text: state.text }); 
  } 

  return (
    <div style={{height: "100%",
    boxSizing: "border-box"}}>
      <ReactQuill value={state.text} onChange={updateBody}></ReactQuill>
    </div>
  );
};

export default withStyles(styles)(EditorComponent);
