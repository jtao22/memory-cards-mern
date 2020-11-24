import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    picture: String,
    likeCount: {
        type: Number,
        default: 0
    },
    time: {
        type: Date,
        default: new Date()
    }
});

const postmessage = mongoose.model('postmessage', postSchema);

export default postmessage;
