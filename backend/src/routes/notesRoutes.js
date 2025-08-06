import express from "express";
import { getAllNotes, getNote, createNote, updateNote, deleteNote } from "../controllers/notesController.js";

const router = express.Router();

router.get('/', getAllNotes)

router.get('/:id', getNote)

router.post('/', createNote)

router.put('/:id', updateNote)

router.delete('/:id', deleteNote)

// app.get("/api/notes", (req,res) => {
//     res.status(200).send({message:"You got 5 notes"})
// })

// app.post("/api/notes", (req,res) => {
//     res.status(201).send({message:"Note created successfully"})
// })

// app.put("/api/notes/:id", (req,res) => {
//     res.status(201).send({message:"Note updated successfully"})
// })

// app.delete("/api/notes/:id", (req,res) => {
//     res.status(201).send({message:"Note deleted successfully"})
// })

export default router