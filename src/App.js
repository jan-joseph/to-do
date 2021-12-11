import "./App.css";
import { useState, useEffect } from "react";
import Note from "./components/Note";

import noteService from "./services/notes";

function App(props) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("Add Here");
  const [showAll, setShowAll] = useState(false);

  // Initial Render to load the notes from db.json to the screen
  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  // Submit Button Handle
  const handleSubmit = (e) => {
    e.preventDefault();
    // New Object Created from the submitted form
    const newNote = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };
    // Adding the new Note Object to db.json
    noteService.create(newNote).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  // Handle the form input value update
  const handleFormChange = (e) => {
    setNewNote(e.target.value);
  };

  // Handle the importance value toggle
  const toggleImportance = (id) => {
    // const url = `https://localhost:3001/notes/${id}`;
    const note = notes.find((note) => note.id === id);
    const updatedNote = { ...note, important: !note.important };
    // Updating to the db
    noteService.update(id, updatedNote).then((returnedNote) => {
      setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
    });
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div className="App">
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        show {!showAll ? "All" : "important"}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note
            id={note.id}
            note={note}
            toggleImportance={() => toggleImportance(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input placeholder={newNote} onChange={handleFormChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default App;
