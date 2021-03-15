import React, { useState } from "react";
import ReactQuill from "react-quill";
import debounce from "../helpers";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import styles from './styles';


const WAIT_INTERVAL = 1500;

const EditorComponent = () => {
  const [state, setState] = useState({
    text: "",
    title: "",
    id: "",
  });
  const [timer, setTimer] = useState(null);   

  const updateBody = (val) =>{
    clearTimeout(timer);
    setState({ text: val });
    setTimer(setTimeout(update, WAIT_INTERVAL));
  }

  const update = () => { 
    console.log("update");
  } 

  return (
    <div style={{height: "100%",
    boxSizing: "border-box"}}>
      <ReactQuill value={state.text} onChange={updateBody}></ReactQuill>
    </div>
  );
};

export default withStyles(styles)(EditorComponent);
