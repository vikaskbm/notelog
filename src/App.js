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
    setState({ ...state, selectedNoteIndex: index, selectedNote: note });
  };

  const noteUpdate = (id, noteObj) => {
    if (id) {
      firebase.firestore().collection("notes").doc(id).update({
        title: noteObj.title,
        body: noteObj.text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  const newNote = async (title) => {
    const note = {
      title: title,
      body: "",
    };

    const newFromDB = await firebase.firestore().collection("notes").add({
      title: note.title,
      body: note.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    const newID = newFromDB.id;

    await setState({ notes: [...state.notes, note] });
    const newNoteIndex = state.notes.indexOf(
      state.notes.filter((n) => n.id == newID)[0]
    );
    setState({
      ...state,
      selectedNote: state.notes[newNoteIndex],
      selectedNoteIndex: newNoteIndex,
    });
  };

  const deleteNote = async (note) => {
    const noteIndex = state.notes.indexOf(note);
    await setState({ ...state, notes: state.notes.filter((n) => n !== note) });
    if (state.selectedNote === noteIndex) {
      setState({ ...state, selectedNoteIndex: null, selectedNote: null });
    } else {
      state.notes.length > 1
        ? selectNote(
            state.notes[state.selectedNoteIndex - 1],
            state.selectedNoteIndex - 1
          )
        : setState({ ...state, selectedNoteIndex: null, selectedNote: null });
    }

    firebase.firestore().collection("notes").doc(note.id).delete();
  };

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
      {state.selectedNote ? (
        <EditorComponent
          selectedNoteIndex={state.selectedNoteIndex}
          selectedNote={state.selectedNote}
          notes={state.notes}
          noteUpdate={noteUpdate}
        />
      ) : null}
    </div>
  );
}

export default App;
