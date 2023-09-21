"use client";

import "./page.css";
//Importerar use session (Här är fördelen med att använda session provider)
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  DocumentData,
  deleteDoc,
  doc,
  QueryDocumentSnapshot,
  updateDoc,
} from "firebase/firestore";

import { FSDataBase } from "./firebase";

import { useState, useEffect } from "react";

export default function Home() {
  //Vi kollar ifall användaren är inloggad
  const session = useSession({
    required: true,
    //Om användaren inte är inloggad, skicka användaren till /signin sidan
    onUnauthenticated() {
      redirect("/signin");
    },
  });

  const [notes, setNotes] = useState<
    QueryDocumentSnapshot<DocumentData, DocumentData>[]
  >([]);

  const [newNote, setNewNote] = useState({ title: "", description: "" });

  const handleTitleInput = (e: any) => {
    setNewNote({ ...newNote, title: e.target.value });
  };

  const handleDescriptionInput = (e: any) => {
    setNewNote({ ...newNote, description: e.target.value });
  };

  const addNote = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    //preventeDefault för att hindra sidan att ladda om och avbryta vår addDoc funktion
    e.preventDefault();
    //Vi kallar på firebase addDoc funktionen, och speciferar vår databas och vilken kollektion vi vill spara datan i
    await addDoc(collection(FSDataBase, "notes"), {
      //Vi speciferar vad för data vi vill skicka till vår databas
      title: newNote.title,
      description: newNote.description,
      userEmail: session?.data?.user?.email,
    });
  };

  //Vi tar ID från <li> som renderas och skickar det med firestore deleteDoc funktionen för att ta bort dokumentet från vår databas
  const removeNote = async (id: string) => {
    console.log(id);
    await deleteDoc(doc(FSDataBase, "notes", id));
  };

  //Edit node
  const [modalState, setModalState] = useState(false);
  const [editNote, setEditNote] = useState({
    id: "",
    title: "",
    description: "",
  });

  const handleEdit = (id: string, title: string, description: string) => {
    setModalState(true);
    setEditNote({ id, title, description });
  };

  const updateNote = async () => {
    await updateDoc(doc(FSDataBase, "notes", editNote.id), {
      title: editNote.title,
      description: editNote.description,
    });
    setModalState(false);
  };

  //uppdatering

  useEffect(() => {
    const showNotes = async () => {
      if (session?.data?.user?.email) {
        const q = query(
          collection(FSDataBase, "notes"),
          where("userEmail", "==", session?.data?.user?.email)
        );
        const queryResults = await getDocs(q);
        setNotes(queryResults.docs);
      }
    };
    showNotes();
  }, [session, updateNote, removeNote, addNote]);

  return (
    <main className="main-container">
      <section className="user-container">
        <p className="user-email">{session?.data?.user?.email}</p>
        <button className="signout-btn" onClick={() => signOut()}>
          Sign out
        </button>
      </section>
      <section className="content-container">
        <h2>To Do List</h2>
        <div className="todo-card">
          <form>
            <input
              //Input field som uppdaterar vår newNote state med handleTitleInput funktionen
              value={newNote.title}
              onChange={handleTitleInput}
              className="input-title"
              type="text"
              placeholder="Go to the gym "
            />
            <input
              value={newNote.description}
              onChange={handleDescriptionInput}
              className="input-description"
              type="text"
              placeholder="Train chest, back and shoulders"
            />
            <button onClick={addNote}>Add to list</button>
          </form>
          <ul>
            {/* Vi mappar alla dokument i databasen som användaren har laddat upp */}
            {notes.map((doc) => (
              // Vi renderar ett <li> element för varje dokument i databasen
              <li key={doc.id}>
                <article>
                  {/* Med <h2> och <p> element som visar värdet som användaren har angett */}
                  <h2>{doc.data().title}</h2>
                  <p>{doc.data().description}</p>
                </article>
                {/* Och en knapp för att kunna kalla på removeNote funktionen */}
                <button onClick={() => removeNote(doc.id)}>remove</button>
                <button
                  onClick={() =>
                    handleEdit(doc.id, doc.data().title, doc.data().description)
                  }
                >
                  edit note
                </button>
              </li>
            ))}
          </ul>
          {modalState && (
            <div className="edit-popup">
              <div className="edit-popup-content">
                <h2>Edit title</h2>
                <input
                  className="edit-title"
                  type="text"
                  value={editNote.title}
                  onChange={(e) =>
                    setEditNote({ ...editNote, title: e.target.value })
                  }
                  placeholder="New title"
                />
                <h2>Edit description</h2>
                <input
                  className="edit-description"
                  type="text"
                  value={editNote.description}
                  onChange={(e) =>
                    setEditNote({ ...editNote, description: e.target.value })
                  }
                  placeholder="New description"
                />
                <div className="modal-btns">
                  <button onClick={() => setModalState(false)}>Cancel</button>
                  <button className="save-btn" onClick={updateNote}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

Home.requireAuth = true;
