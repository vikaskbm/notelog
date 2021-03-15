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
      <SideBarComponent selectedNoteIndex={state.selectedNoteIndex} notes={state.notes}/>
      <EditorComponent />
    </div>
  );
}

export default App;
