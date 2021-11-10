import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i
            className="fas fa-trash-alt mx-2"
            onClick={() => {
              deleteNote(note._id);
            }}
          ></i>
          <i
            className="fas fa-edit mx-2"
            onClick={() => {
              updateNote(note);
            }}
          ></i>
          <span
            class="badge bg-secondary"
            style={{ position: "absolute", right: "13px", bottom: "6px" }}
          >
            {note.tag}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
