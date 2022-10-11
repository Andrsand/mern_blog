import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId, // ссылка на другую Schema
            ref: 'Post',
        }
    ],
},
    { timestamps: true }, // дата создания поста
)

export default mongoose.model('User', UserSchema) // экспрт модели User со схемой User Schema