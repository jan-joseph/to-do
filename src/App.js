import "./App.css";
import { useState } from "react";
import Note from "./components/Note";

function App(props) {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("Add Here");

  const handleSubmit = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };
  };

  const handleFormChange = (e) => {
    setNewNote(e.target.value);
  };

  return (
    <div className="App">
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note id={note.id} content={note.content} />
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          placeholder={newNote}
          onChange={handleFormChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default App;
