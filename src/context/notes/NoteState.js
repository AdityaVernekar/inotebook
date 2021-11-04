import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "61812399b23540c39ce98f296",
      user: "618234f53a617ff2cd34e7dd",
      title: "first note",
      description: "bro pehlawala hai",
      tag: "sweet",
      date: "2021-11-03T07:26:19.015Z",
      __v: 0,
    },
    {
      _id: "6182399b23540c319ce98f298",
      user: "618234f53a617ff2cd34e7dd",
      title: "first note",
      description: "bro pehlawala hai",
      tag: "sweet",
      date: "2021-11-03T07:26:19.427Z",
      __v: 0,
    },
    {
      _id: "61823991b23540c39ce98f298",
      user: "618234f53a617ff2cd34e7dd",
      title: "first note",
      description: "bro pehlawala hai",
      tag: "sweet",
      date: "2021-11-03T07:26:19.427Z",
      __v: 0,
    },
    {
      _id: "61823199b23540c39ce98f298",
      user: "618234f53a617ff2cd34e7dd",
      title: "first note",
      description: "bro pehlawala hai",
      tag: "sweet",
      date: "2021-11-03T07:26:19.427Z",
      __v: 0,
    },
  ];
  const [notes, setnotes] = useState(notesInitial);

  return <NoteContext.Provider value={{ notes, setnotes }}>{props.children}</NoteContext.Provider>;
};

export default NoteState;
