import "./App.css";
import { useState, useEffect } from "react";
import Note from "./components/Note";
import axios from "axios";

function App(props) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("Add Here");

  useEffect(() => {
    axios
      .get("http://localhost:3001/notes")
      .then((response) => {
        setNotes(response.data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // New Object Created from the submitted form
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };
    // Adding the new Note Object to db.json
    axios
      .post("http://localhost:3001/notes", noteObject)
      .then((response) => {
        setNotes(notes.concat(response.data));
        setNewNote("");
      });
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
