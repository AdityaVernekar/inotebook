import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000/";
  const notesInitial = [];
  const [notes, setnotes] = useState(notesInitial);

  // add Note
  const addNote = async (title, description, tag) => {
    // API Call
    const response = await fetch(`${host}api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTgyMzRmNTNhNjE3ZmYyY2QzNGU3ZGQiLCJpYXQiOjE2MzY0NDU1Mzl9.SldsgGiZ9eDxE5ivCPO2OR5Aqdbj87NP8TunSgZBMYc",
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const note = await response.json();

    setnotes(notes.concat(note));
  };
  // get all notes
  const getNotes = async () => {
    const response = await fetch(`${host}api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTgyMzRmNTNhNjE3ZmYyY2QzNGU3ZGQiLCJpYXQiOjE2MzY0NDU1Mzl9.SldsgGiZ9eDxE5ivCPO2OR5Aqdbj87NP8TunSgZBMYc",
      },
    });
    const json = await response.json();

    setnotes(json);
  };
  // delete Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTgyMzRmNTNhNjE3ZmYyY2QzNGU3ZGQiLCJpYXQiOjE2MzY0NDU1Mzl9.SldsgGiZ9eDxE5ivCPO2OR5Aqdbj87NP8TunSgZBMYc",
      },
    });
    const json = response.json();
    console.log(json);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
  };
  // edit Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTgyMzRmNTNhNjE3ZmYyY2QzNGU3ZGQiLCJpYXQiOjE2MzY0NDU1Mzl9.SldsgGiZ9eDxE5ivCPO2OR5Aqdbj87NP8TunSgZBMYc",
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = await response.json();

    // logic to edit notes
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes);
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
