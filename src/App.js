import "./App.css";
import { useState, useEffect } from "react";
import firebase from "firebase";
import SideBarComponent from "./sidebar/sidebar";
import EditorComponent from "./editor/editor";
function App() {
  const [state, setState] = useState({
    selectedNoteIndex: null,
    selectedNote: null,
    notes: null,
  });


  const selectNote = (note, index) => {
    setState({...state, selectedNoteIndex: index, selectedNote: note});
  }
  
  const newNote = (n, i) =>{
    console.log(state);
  }

  const deleteNote = (note) => {
    if(window.confirm(`Are you sure you want to delete: ${note.title}`)) {
      console.log("Note deleted");
    } else {
      console.log("NOT deleted");
    }
  }

  

  useEffect(() => {
    firebase
      .firestore()
      .collection("notes")
      .onSnapshot((serverUpdate) => {
        const notes = serverUpdate.docs.map((doc) => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });
        console.log(notes);
        setState({ notes: notes });
      });
  }, []);

  return (
    <div className="app-container">
      <SideBarComponent 
        selectedNoteIndex={state.selectedNoteIndex}  
        notes={state.notes}
        deleteNote={deleteNote}
        selectNote={selectNote}
        newNote={newNote}
      />
      {
        state.selectedNote ? 
          <EditorComponent 
          selectedNoteIndex={state.selectedNoteIndex}
          selectedNote={state.selectedNote}
          notes={state.notes}    
          /> :
          null
      }
    </div>
  );
}

export default App;
