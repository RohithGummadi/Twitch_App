import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema ({
    email: {type: String, unique: true},
    username: {type: String},
    password: {type: String},
})

export default mongoose.model("User", userSchema)