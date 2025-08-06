import Note from "../model/Note.js";

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error in getAllNotes Controller", error)
        res.status(500).json({ Error: "Internal Server Error" })
    }
}

export const getNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)

        if (!note) return res.status(404).json({Error: "Id not found"})

        res.status(200).json(note)
    } catch (error) {
        console.error("Error in getNote Controller", error)
        res.status(500).json({ Error: "Internal Server Error" })
    }
}

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content })

        await newNote.save()
        res.status(201).json(newNote)
    } catch (error) {
        console.error("Error in createNote Controller", error)
        res.status(500).json({ Error: "Internal Server Error" })
    }
}

export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body

        if (!title || !content) return res.status(400).json({ Error: "Title or content is required!" })

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true, }
        );

        if (!updatedNote) return res.status(404).json({ message: "Note not found" })

        res.status(200).json(updatedNote)
    } catch (error) {
        console.error("Error in updateNote Controller", error)
        res.status(500).json({ Error: "Internal Server Error" })
    }
}

export const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id)

        if(!deletedNote) return res.status(404).json({message: "Note not found"});

        res.status(200).json({ message: "Note Deleted Successfully" });

    } catch (error) {
        console.error("Error in deleteNote Controller", error);
        res.status(500).json({ Error: "Internal Server Error" });
    }
}