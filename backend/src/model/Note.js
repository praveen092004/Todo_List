import mongoose from "mongoose";
import moongose from "mongoose"

const noteSchema = new moongose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        }
    },
    {timestamps: true} 
);

const Note = mongoose.model("Note", noteSchema);
export default Note;