const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
    userId:{
        type:String,
        ref:'user',
        required:true
    }
}, {
    timestamps: true,
    // This transform maps MongoDB's _id to id for your React frontend
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

module.exports = mongoose.model('Todo', todoSchema);